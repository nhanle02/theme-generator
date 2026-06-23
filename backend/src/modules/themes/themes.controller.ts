import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body()
    dto: CreateThemeDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.themesService.create(dto, file);
  }

  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.themesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateThemeDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.themesService.update(id, dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.themesService.remove(id);
  }
}
