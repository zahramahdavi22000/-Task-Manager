import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MinioService } from 'src/minio.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private userService: UserService,
        private minioService: MinioService,
    ) { }

    async findAllWithUserId(userId: number, page: number = 1, limit: number = 10): Promise<Task[]> {
        const tasks = await this.taskRepository.find({
            where: { userId },
            skip: (page - 1) * limit,
            take: limit
        });
        return tasks;
    }

    async findOne(userId: number, id: number): Promise<Task> {
        return await this.taskRepository.findOne({ where: { id, userId }, relations: ['user'] });
    }

    async create(createTaskDto: CreateTaskDto, userId: number, fileBuffer?: Buffer): Promise<Task> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const newTask = this.taskRepository.create({ ...createTaskDto, userId });

        if (fileBuffer) {
            const attachmentName = `task_${newTask.id}_attachment`;
            await this.minioService.uploadAttachment('attachments', attachmentName, fileBuffer, fileBuffer.length);
            newTask.fileAttachment = attachmentName;
        }

        return await this.taskRepository.save(newTask);
    }

    async update(id: number, updateTaskDto: Partial<UpdateTaskDto>): Promise<Task> {
        await this.taskRepository.update(id, updateTaskDto);
        return this.taskRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<any> {
        return await this.taskRepository.delete(id);
    }
}
