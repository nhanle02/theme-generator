import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateScriptDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  style?: string;

  @IsOptional()
  duration?: number;
}
