import { Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { ImageUploadService } from './image-upload.service';


@Controller('admin/image-upload')
export class ImageUploadController {

    constructor(private readonly imageUploadService: ImageUploadService) {}


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        const savedMetaData = await this.imageUploadService.onImageUploaded(file)
        console.log(savedMetaData)
        return savedMetaData;
    }

}
