import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MinioService } from 'src/minio.service';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    controllers: [AdminController],
    providers: [ConfigService, UserService, JwtAuthGuard, RolesGuard, AuthService, JwtService, MinioService],
})

export class AdminModule { }
