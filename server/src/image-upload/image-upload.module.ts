import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './image-upload.service';
import { join } from 'path';
import { MulterModule } from "@nestjs/platform-express";
import { Image, ImageSchema } from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: join(__dirname, '../../..', 'site/public/img'),
      }),
    }),
  MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema}])],
  controllers: [ImageUploadController],
  providers: [ImageUploadService]
})
export class ImageUploadModule {}
