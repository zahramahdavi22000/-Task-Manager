import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'localhost'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USER', 'root'),
        password: configService.get<string>('MYSQL_PASSWORD', 'password'),
        database: configService.get<string>('MYSQL_DATABASE', 'task_manager'),
        entities: [User, Task],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TaskModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
