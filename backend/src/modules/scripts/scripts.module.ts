import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';

import { ScriptsController } from './scripts.controller';

import { ScriptsService } from './scripts.service';

import { GenerationHistory } from 'src/database/entities/generation-history.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([GenerationHistory])],

  controllers: [ScriptsController],

  providers: [ScriptsService],
})
export class ScriptsModule {}
