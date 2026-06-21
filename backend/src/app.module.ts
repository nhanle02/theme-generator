import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { ThemesModule } from './modules/themes/themes.module';
import { UploadModule } from './modules/uploads/uploads.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true, // 🔥 THÊM DÒNG NÀY
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ThemesModule,
    UploadModule,
    AuthModule,
  ],
})
export class AppModule {}
