import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<User[]> {
    return await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async updateAvatarPath(userId: number, avatarPath: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    user.avatarPath = avatarPath;
    return await this.userRepository.save(user);
  }
}
