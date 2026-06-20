import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async upload(file: Express.Multer.File, folder: string) {
    const result = await this.cloudinaryService.uploadFile(file, folder);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
}
