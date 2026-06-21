import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async createLocalUser(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepo.save({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      provider: 'local',
      credit_balance: 0,
    });
  }
  async createGoogleUser(data: {
    email: string;
    name: string;
    google_id: string;
    avatar_url?: string;
  }) {
    return this.userRepo.save({
      email: data.email,
      name: data.name,
      google_id: data.google_id,
      avatar_url: data.avatar_url,
      provider: 'google',
      credit_balance: 0,
    });
  }
  create(data: Partial<User>) {
    return this.userRepo.save(data);
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    const updateData: any = {};

    if (updateUserDto.name) updateData.name = updateUserDto.name;

    // 🔥 upload avatar nếu có file
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(
        file,
        'avatars',
      );

      updateData.avatar_url = uploadResult.secure_url;
    }

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepo.update(id, updateData);

    return this.userRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
