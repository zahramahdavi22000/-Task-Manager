import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from "src/user/dto/update-user.dto"
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio.service';
import { Multer } from 'multer';


@Controller('user')
export class UserController {

    constructor(
        private readonly minioService: MinioService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }


    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<User> { // Use CreateUserDto
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: { username: string; password: string }): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(loginUserDto.username, loginUserDto.password);
        if (user) {
            return this.authService.login(user);
        } else {
            throw new Error('Invalid credentials');
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findOne(@Req() request: any): Promise<User> {
        const id = request.user.id;
        return await this.userService.findById(id);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async update(@Req() request: any, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const id = request.user.id;
        return await this.userService.update(id, updateUserDto);
    }


    @Post('avatar')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadAvatar(@UploadedFile() avatar: Multer.File, @Req() request: any): Promise<string> {
        const id = request.user.id;

        const avatarName = `avatar_${id}_${Date.now()}.${avatar.originalname.split('.').pop()}`;
        await this.minioService.uploadAvatar('avatars', avatarName, avatar.buffer, avatar.size);
        await this.userService.updateAvatarPath(id, avatarName);
        return `https://minio.example.com/avatars/${avatarName}`;
    }

    @Get('avatar/:avatarName')
    async serveAvatar(@Param('avatarName') avatarName: string, @Res() res): Promise<void> {
        const stream = await this.minioService.getAvatarStream('avatars', avatarName);
        stream.pipe(res);
    }
}
