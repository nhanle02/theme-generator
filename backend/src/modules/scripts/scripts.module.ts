import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScriptsController } from './scripts.controller';
import { ScriptsService } from './scripts.service';

import { GenerationHistory } from 'src/database/entities/generation-history.entity';

import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule, TypeOrmModule.forFeature([GenerationHistory])],

  controllers: [ScriptsController],

  providers: [ScriptsService],
})
export class ScriptsModule {}
