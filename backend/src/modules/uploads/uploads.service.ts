import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: Express.Multer.File, folder: string) {
    const result = await this.cloudinaryService.uploadFile(file, folder);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
  async uploadBuffer(buffer: Buffer, folder: string) {
    const result = await this.cloudinaryService.uploadBuffer(buffer, folder);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
  async deleteFile(publicId: string) {
    return this.cloudinaryService.deleteFile(publicId);
  }
}
