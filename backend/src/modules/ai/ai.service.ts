import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get('GEMINI_API_KEY')!,
    });
  }

  async generateText(prompt: string): Promise<string> {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.configService.get('GEMINI_TEXT_MODEL')!,

          contents: prompt,

          config: {
            responseMimeType: 'application/json',
          },
        });

        return response.text ?? '';
      } catch (error: any) {
        console.log(`Attempt ${attempt}/${maxRetries}`);

        if (error.status === 503 && attempt < maxRetries) {
          const delay = attempt * 2000;

          await new Promise((resolve) => setTimeout(resolve, delay));

          continue;
        }

        throw new InternalServerErrorException(
          error?.message ?? 'Generate text failed',
        );
      }
    }

    throw new InternalServerErrorException('Failed after retries');
  }

  async generateImage(prompt: string, imageBase64?: string) {
    try {
      const parts: any[] = [];

      // 1. add image nếu có
      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType: 'image/png',
            data: imageBase64,
          },
        });
      }

      // 2. add text prompt
      parts.push({
        text: prompt,
      });

      const response = await this.ai.models.generateContent({
        model: this.configService.get<string>('GEMINI_IMAGE_MODEL')!,
        contents: [
          {
            role: 'user',
            parts,
          },
        ],
      });

      const candidate = response?.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find(
        (p: any) => p.inlineData,
      );

      if (!imagePart?.inlineData?.data) {
        throw new Error('No image returned');
      }

      return {
        base64: imagePart.inlineData.data,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Generate image failed');
    }
  }
}
