import { Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"


@Controller('admin/image-upload')
export class ImageUploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }

}
