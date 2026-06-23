import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['photo', 'video', 'script'])
  type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  prompt_template?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
