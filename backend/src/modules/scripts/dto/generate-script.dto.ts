import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateScriptDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
