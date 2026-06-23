import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AiService } from '../ai/ai.service';

import {
  GenerationHistory,
  GenerationStatus,
} from 'src/database/entities/generation-history.entity';

import { Theme } from 'src/database/entities/themes.entity';

import { CloudinaryService } from '../uploads/cloudinary.service';

import { GenerateImageDto } from './dto/generate-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,

    @InjectRepository(GenerationHistory)
    private readonly historyRepository: Repository<GenerationHistory>,

    private readonly aiService: AiService,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async generate(file: Express.Multer.File, dto: GenerateImageDto, user: any) {
    // 1. Find theme
    const theme = await this.themeRepository.findOne({
      where: {
        id: Number(dto.theme_id),
        is_active: true,
      },
    });

    if (!theme) {
      throw new InternalServerErrorException('Theme not found');
    }

    // 2. Upload input image
    let inputImageUrl: string | undefined;

    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file, 'inputs');
      inputImageUrl = upload.secure_url;
    }

    // 3. Create history
    const history = await this.historyRepository.save({
      user_id: user.id,
      type: 'image',
      theme_id: theme.id,
      status: GenerationStatus.PROCESSING,
      input_json: {
        type: 'image',
        description: dto.description,
        theme_id: theme.id,
        theme_name: theme.name,
        input_image_url: inputImageUrl,
      },
      credits_used: 3,
    } as Partial<GenerationHistory>);

    try {
      // 4. Build prompt
      const prompt = this.buildPrompt(theme, dto.description);

      // 5. Convert image
      const imageBase64 = file ? file.buffer.toString('base64') : '';

      // 6. Generate image (ONLY ONCE)
      const aiResult = await this.aiService.generateImage(
        prompt,
        imageBase64 || undefined,
      );

      // 7. Convert base64 → buffer
      const buffer = Buffer.from(aiResult.base64, 'base64');

      // 8. Upload to Cloudinary
      const uploadResult: any = await this.cloudinaryService.uploadBuffer(
        buffer,
        'outputs',
      );

      const outputUrl = uploadResult.secure_url;

      // 9. Update history
      await this.historyRepository.save({
        id: history.id,
        status: GenerationStatus.COMPLETED,
        output_json: {
          status: 'success',
          result: {
            image_url: outputUrl,
          },
          model: 'gemini-image',
        },
      });

      return {
        data: {
          image_url: outputUrl,
        },
      };
    } catch (error: any) {
      await this.historyRepository.save({
        id: history.id,
        status: GenerationStatus.FAILED,
        output_json: {
          status: 'error',
          error: error.message,
        },
      });

      throw new InternalServerErrorException('Generate image failed');
    }
  }

  private buildPrompt(theme: Theme, description?: string) {
    return `
      You are an AI image generator.

      Theme:
      ${theme.name}

      Base prompt:
      ${theme.prompt_template || ''}

      Extra user description:
      ${description || ''}

      Rules:
      - keep same face identity
      - high quality cinematic lighting
      - professional portrait
    `;
  }
}
