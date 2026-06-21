import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  google_id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar_url: string;

  @IsOptional()
  @IsNumber()
  credit_balance: number;
}
