import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ScriptsService } from './scripts.service';

import { GenerateScriptDto } from './dto/generate-script.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  generate(
    @Body()
    dto: GenerateScriptDto,
    @Req() req,
  ) {
    return this.scriptsService.generate(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findMyScripts(@Req() req) {
    return this.scriptsService.findByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    return this.scriptsService.findOne(id, req.user.id);
  }
}
