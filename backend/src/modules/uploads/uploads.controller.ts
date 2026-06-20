import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './uploads.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,

    @Body('folder')
    folder: string,
  ) {
    return this.uploadService.upload(file, folder || 'uploads');
  }
}
