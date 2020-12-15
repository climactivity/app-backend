import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './image-upload.service';
import { join } from 'path';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: join(__dirname, '../../..', 'site/public/img'),
      }),
    })
  ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService]
})
export class ImageUploadModule {}
