import { Module } from '@nestjs/common';
import { UploadController } from './uploads.controller';
import { UploadService } from './uploads.service';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService],
  exports: [UploadService, CloudinaryService],
})
export class UploadModule {}
