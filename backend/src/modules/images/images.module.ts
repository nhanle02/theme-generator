import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

import { GenerationHistory } from 'src/database/entities/generation-history.entity';

import { AiModule } from '../ai/ai.module';
import { Theme } from 'src/database/entities/themes.entity';
import { UploadModule } from '../uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theme, GenerationHistory]),
    AiModule,
    UploadModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
