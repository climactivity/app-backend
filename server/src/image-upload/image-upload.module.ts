import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './image-upload.service';
import { join, extname } from 'path';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { Image, ImageSchema } from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const editFileName = (rq, file, callback) => {
  const fileExtName = extname(file.originalname);
  const salt = Array(11).fill(0).map(() => Math.round(Math.random() * 16).toString(16)).join('');
  const name = `${salt}${fileExtName}`;
  callback(null, name);
};

export const fileDestination = (rq, file, callback) => {
  if (process.env.IMG_DIR != null) {
    callback(null, process.env.IMG_DIR); 
  } else {
    callback(null, join(__dirname, '../../..', 'site/public/img'))
  }
}


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          filename: editFileName,
          destination: fileDestination
      })
    }),
    }),
  MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema}])],
  controllers: [ImageUploadController],
  providers: [ImageUploadService]
})
export class ImageUploadModule {}
