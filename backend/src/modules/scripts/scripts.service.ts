import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { GoogleGenAI } from '@google/genai';

import { GenerateScriptDto } from './dto/generate-script.dto';

import {
  GenerationHistory,
  GenerationStatus,
} from 'src/database/entities/generation-history.entity';

@Injectable()
export class ScriptsService {
  private ai: GoogleGenAI;

  constructor(
    @InjectRepository(GenerationHistory)
    private readonly historyRepository: Repository<GenerationHistory>,

    private readonly configService: ConfigService,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY')!,
    });
  }

  async generate(dto: GenerateScriptDto, user: any) {
    const history = await this.historyRepository.save({
      user_id: user.id,
      type: 'script',

      status: GenerationStatus.PROCESSING,

      input_json: {
        description: dto.description,
      },

      credits_used: 1,
    });

    try {
      const script = await this.generateAI(dto.description);

      await this.historyRepository.update(history.id, {
        status: GenerationStatus.COMPLETED,

        output_json: {
          script,
        } as any,
      });

      return {
        script,
      };
    } catch (error) {
      await this.historyRepository.update(history.id, {
        status: GenerationStatus.FAILED,
      });

      console.error(error);

      throw new InternalServerErrorException('Generate script failed');
    }
  }

  private async generateAI(description: string) {
    const prompt = `
    Tạo một kịch bản video ngắn.

    Yêu cầu:
    ${description}

    Trả đúng format:

    HOOK:
    BODY:
    CTA:
    `;

    const response = await this.ai.models.generateContent({
      model: this.configService.get<string>('GEMINI_MODEL')!,

      contents: prompt,
    });

    return response.text || '';
  }
  async findByUser(userId: number) {
    return this.historyRepository.find({
      where: {
        user_id: userId,
        type: 'script',
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number, userId: number) {
    const script = await this.historyRepository.findOne({
      where: {
        id,
        user_id: userId,
        type: 'script',
      },
    });

    return {
      data: script,
    };
  }
}
