import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwtSecret = process.env.JWT_SECRET ?? 'fallback-secret';

const jwtExpires = process.env.JWT_EXPIRES_IN ?? '7d';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: jwtSecret,

      signOptions: {
        expiresIn: jwtExpires as '7d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],

  exports: [AuthService],
})
export class AuthModule {}
