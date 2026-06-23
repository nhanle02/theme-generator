import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateImageDto {
  @Type(() => Number)
  @IsNumber()
  theme_id: number;

  @IsOptional()
  @IsString()
  description?: string;
}
