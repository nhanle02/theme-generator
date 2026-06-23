import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Theme } from 'src/database/entities/themes.entity';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themeRepo: Repository<Theme>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateThemeDto, file?: Express.Multer.File) {
    let previewUrl: string | undefined;

    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file, 'themes');

      previewUrl = upload.secure_url;
    }

    const theme = this.themeRepo.create({
      ...dto,

      ...(previewUrl && {
        preview_url: previewUrl,
      }),
    });

    return this.themeRepo.save(theme);
  }

  findAll() {
    return this.themeRepo.find();
  }

  findOne(id: number) {
    return this.themeRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateThemeDto, file?: Express.Multer.File) {
    const theme = await this.themeRepo.findOneBy({
      id,
    });

    if (!theme) {
      throw new Error('Theme not found');
    }

    let previewUrl: string | undefined;

    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file, 'themes');

      previewUrl = upload.secure_url;
    }

    Object.assign(theme, {
      ...dto,
      ...(previewUrl && {
        preview_url: previewUrl,
      }),
    });

    return this.themeRepo.save(theme);
  }

  remove(id: number) {
    return this.themeRepo.delete(id);
  }
}
