import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Theme } from 'src/database/entities/themes.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themeRepo: Repository<Theme>,
  ) {}

  create(createThemeDto: CreateThemeDto) {
    return this.themeRepo.save(createThemeDto);
  }

  findAll() {
    return this.themeRepo.find();
  }

  findOne(id: number) {
    return this.themeRepo.findOneBy({ id });
  }

  async update(id: number, updateThemeDto: UpdateThemeDto) {
    await this.themeRepo.update(id, updateThemeDto);

    return this.themeRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.themeRepo.delete(id);
  }
}
