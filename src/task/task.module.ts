import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MinioService } from 'src/minio.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TaskController],
  providers: [ConfigService, TaskService, JwtAuthGuard, MinioService, UserService],
})
export class TaskModule { }
