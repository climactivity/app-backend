import { Controller, UploadedFile, Post, UseInterceptors, Get, Query, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { extname, join } from 'path';
import { ImageUploadService } from './image-upload.service';
import { diskStorage } from 'multer';


export const editFileName = (rq, file, callback) => {
    const fileExtName = extname(file.originalname);
    const salt = Array(11).fill(0).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    const name = `${salt}${fileExtName}`;
    callback(null, name);
};

export const fileDestination = (rq, file, callback) => {
    callback(null, join(__dirname, '../../..', 'site/public/img'))
}

@Controller('admin/image-upload')
export class ImageUploadController {

    constructor(private readonly imageUploadService: ImageUploadService) { }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            filename: editFileName,
            destination: fileDestination
        })
    }))
    async uploadFile(@UploadedFile() file, @Body("meta") meta) {
        const savedMetaData = await this.imageUploadService.onImageUploaded(file, JSON.parse(meta))
        return savedMetaData;
    }

    @Get()
    async getPage(@Query("offset") offset: number, @Query("pageSize") pageSize: number) {
        const data = await this.imageUploadService.getImages(offset ?? 0, pageSize ?? 10);
        const count = await this.imageUploadService.countImages();
        return  {
            data, count
        }
    }
}
