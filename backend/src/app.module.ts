import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { ThemesModule } from './modules/themes/themes.module';
import { UploadModule } from './modules/uploads/uploads.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { ScriptsModule } from './modules/scripts/scripts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ThemesModule,
    UploadModule,
    AuthModule,
    ScriptsModule,
  ],
})
export class AppModule {}
