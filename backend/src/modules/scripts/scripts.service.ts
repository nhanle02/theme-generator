import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GenerateScriptDto } from './dto/generate-script.dto';

import { AiService } from '../ai/ai.service';

import {
  GenerationHistory,
  GenerationStatus,
} from 'src/database/entities/generation-history.entity';

@Injectable()
export class ScriptsService {
  constructor(
    @InjectRepository(GenerationHistory)
    private readonly historyRepository: Repository<GenerationHistory>,

    private readonly aiService: AiService,
  ) {}

  async generate(dto: GenerateScriptDto, user: any) {
    const input = {
      prompt: dto.description,
      platform: dto.platform ?? 'TikTok',
      style: dto.style ?? 'Tự nhiên',
      duration: dto.duration ?? 30,
    };

    const history = await this.historyRepository.save({
      user_id: user.id,

      type: 'script',

      status: GenerationStatus.PROCESSING,

      input_json: input,

      credits_used: 1,
    });

    try {
      const prompt = this.buildPrompt(input);

      const response = await this.aiService.generateText(prompt);

      const script = this.parseResponse(response);

      await this.historyRepository.update(history.id, {
        status: GenerationStatus.COMPLETED,

        output_json: {
          result: script,
        },
      });

      return {
        result: script,
      };
    } catch (error) {
      console.error('Generate script error:', error.message);

      await this.historyRepository.update(history.id, {
        status: GenerationStatus.FAILED,

        output_json: {
          error: error.message,
        },
      });

      throw new InternalServerErrorException('Generate script failed');
    }
  }

  private buildPrompt(input: {
    prompt: string;
    platform: string;
    style: string;
    duration: number;
  }) {
    return `
  Tạo kịch bản video.

  Thông tin:

  Nền tảng:
  ${input.platform}

  Phong cách:
  ${input.style}

  Độ dài:
  ${input.duration} giây

  Yêu cầu:
  ${input.prompt}

  Chỉ trả về JSON hợp lệ.

  {
    "hook":"",
    "body":"",
    "cta":""
  }
  `;
  }

  private parseResponse(result: string) {
    try {
      const clean = result
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(clean);

      return {
        hook: parsed.hook || '',

        body: parsed.body || '',

        cta: parsed.cta || '',
      };
    } catch {
      throw new Error('Invalid AI response format');
    }
  }

  async findByUser(userId: number) {
    return this.historyRepository.find({
      where: {
        user_id: userId,
      },

      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number, userId: number) {
    const item = await this.historyRepository.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    return {
      data: item,
    };
  }
}
