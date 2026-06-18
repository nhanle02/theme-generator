export class CreateUserDto {
  email: string;
  name: string;
  google_id?: string;
  avatar_url?: string;
  credit_balance?: number;
}
