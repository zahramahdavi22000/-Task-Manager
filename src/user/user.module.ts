import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MinioService } from 'src/minio.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [ConfigService, UserService, JwtAuthGuard, AuthService, JwtService, MinioService],
    exports: [UserService]
})

export class UserModule { }
