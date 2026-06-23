import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

import { GenerationHistory } from 'src/database/entities/generation-history.entity';

import { AiModule } from '../ai/ai.module';
import { Theme } from 'src/database/entities/themes.entity';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, GenerationHistory]), AiModule],
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryService],
})
export class ImagesModule {}
