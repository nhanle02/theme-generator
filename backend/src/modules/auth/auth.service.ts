import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    return {
      message: 'register success',
      data: dto,
    };
  }

  async login(dto: LoginDto) {
    const user = {
      id: 1,
      email: dto.email,
    };

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken =
      this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
