import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from 'src/database/entities/themes.entity';
import { UploadModule } from '../uploads/uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), UploadModule],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
