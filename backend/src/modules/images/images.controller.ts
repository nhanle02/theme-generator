import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GenerateImageDto } from './dto/generate-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  @UseInterceptors(FileInterceptor('file'))
  generate(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: GenerateImageDto,
    @Req() req,
  ) {
    return this.imagesService.generate(file, dto, req.user);
  }
}
