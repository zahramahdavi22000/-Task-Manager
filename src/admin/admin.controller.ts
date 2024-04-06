import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from "src/admin/dto/update-user.dto"

@Controller('admin')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class AdminController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get("user")
    @Roles('admin')
    async findUsers(@Body('page') page: number = 1, @Body('limit') limit: number = 10): Promise<User[]> {
        return await this.userService.findAll(page, limit);
    }

    @Patch("user")
    @Roles('admin')
    async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        const { id, ...rest } = updateUserDto
        return await this.userService.update(id, rest)
    }

    @Delete("user")
    @Roles('admin')
    async deleteUser(@Body("id") id: number): Promise<any> {
        return await this.userService.delete(id)
    }
}
