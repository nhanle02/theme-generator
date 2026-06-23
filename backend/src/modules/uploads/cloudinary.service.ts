import { Injectable } from '@nestjs/common';
import cloudinary from 'src/config/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            public_id: `${folder}-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              return reject(new Error(error.message));
            }

            resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });
  }

  async uploadBuffer(buffer: Buffer, folder: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            public_id: `${folder}-${Date.now()}`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Delete cloudinary failed:', error);

      throw error;
    }
  }
}
