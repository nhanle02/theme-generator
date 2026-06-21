import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
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
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) return null;

    const updateData: any = {
      name: updateUserDto.name,
      avatar_url: updateUserDto.avatar_url,
    };

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
