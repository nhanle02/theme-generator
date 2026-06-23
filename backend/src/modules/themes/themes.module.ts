import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from 'src/database/entities/themes.entity';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemesController],
  providers: [ThemesService, CloudinaryService],
})
export class ThemesModule {}
