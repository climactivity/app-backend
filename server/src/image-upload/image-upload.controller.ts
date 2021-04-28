import { Controller, UploadedFile, Post, UseInterceptors, Get, Query, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { extname, join } from 'path';
import { ImageUploadService } from './image-upload.service';
import { diskStorage } from 'multer';



@Controller('admin/image-upload')
export class ImageUploadController {

    constructor(private readonly imageUploadService: ImageUploadService) { }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body("meta") meta) {
        const savedMetaData = await this.imageUploadService.onImageUploaded(file, JSON.parse(meta))
        return savedMetaData;
    }

    @Get()
    async getPage(@Query("offset") offset: number, @Query("pageSize") pageSize: number, @Query("query") query) {
        console.log(query)
        const data = await this.imageUploadService.getImages(offset ?? 0, pageSize ?? 10, query);
        const count = await this.imageUploadService.countImages();
        return  {
            data, count
        }
    }
}
