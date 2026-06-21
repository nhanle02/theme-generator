import { IsEmail, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  google_id: string;

  @IsString()
  avatar_url: string;
}
