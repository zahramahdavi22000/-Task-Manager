import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
    private readonly minioClient: Minio.Client;

    constructor(private readonly configService: ConfigService) {

        this.minioClient = new Minio.Client({
            endPoint: this.configService.get<string>('MINIO_END_POINT', '127.0.0.1'),
            port: Number(this.configService.get<number>('MINIO_PORT', 9000)),
            useSSL: this.configService.get<boolean>('MINIO_USE_SSL', false),
            accessKey: this.configService.get<string>('MINIO_ACCESS_KEY', 'YOUR_ACCESS_KEY'),
            secretKey: this.configService.get<string>('MINIO_SECRET_KEY', 'YOUR_SECRET_KEY'),
        });


        this.ensureBucketExists('avatars');
        this.ensureBucketExists('attachments');
    }

    async uploadAvatar(bucketName: string, avatarName: string, buffer: Buffer, size: number): Promise<void> {
        await this.minioClient.putObject(bucketName, avatarName, buffer, size);
    }

    async getAvatarStream(bucketName: string, avatarName: string): Promise<NodeJS.ReadableStream> {
        return this.minioClient.getObject(bucketName, avatarName);
    }

    async uploadAttachment(bucketName: string, attachmentName: string, buffer: Buffer, size: number): Promise<void> {
        await this.minioClient.putObject(bucketName, attachmentName, buffer, size);
    }

    async ensureBucketExists(bucketName: string): Promise<void> {
        try {
            // Check if the bucket already exists
            const bucketExists = await this.minioClient.bucketExists(bucketName);
            if (!bucketExists) {
                // If the bucket doesn't exist, create it
                await this.minioClient.makeBucket(bucketName);
                console.log(`Bucket "${bucketName}" created successfully.`);
            } else {
                console.log(`Bucket "${bucketName}" already exists.`);
            }
        } catch (error) {
            console.error(`Error ensuring bucket "${bucketName}" exists:`, error);
            throw error;
        }
    }
}
