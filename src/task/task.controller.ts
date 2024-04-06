import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MinioService } from 'src/minio.service';
import { Multer } from 'multer';


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService,
        private readonly minioService: MinioService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Req() request: any, @Body('page') page: number = 1, @Body('limit') limit: number = 10): Promise<Task[]> {
        const userId = request.user.id;
        return await this.taskService.findAllWithUserId(userId, page, limit);
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async find(@Req() request: any, @Param('id') id: number): Promise<Task> {
        const userId = request.user.id;
        return await this.taskService.findOne(userId, id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('attachment'))
    async create(@Req() request: any, @UploadedFile() attachment: Multer.File, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const userId = request.user.id;
        createTaskDto.userId = userId
        return await this.taskService.create(createTaskDto, userId, attachment.buffer,);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateTaskDto: Partial<Task>): Promise<Task> {
        return await this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        return await this.taskService.delete(id);
    }
}
