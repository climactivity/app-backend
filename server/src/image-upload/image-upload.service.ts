import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageUploadService {

    private logger = new  Logger(ImageUploadService.name)

    constructor(
        private configService: ConfigService,
        @InjectModel(Image.name) private imageModel : Model<ImageDocument>
        ) {}; 

    async onImageUploaded (imageFile, meta) {
        let relativeUrl = `/img/${imageFile.filename}`
        let imageMetadata = new this.imageModel({...imageFile, ...meta, relativeUrl})
        
        return imageMetadata.save();   
    }

    async getImages(offset, pageSize, query) { 
        return this.imageModel.find({"title": new RegExp( query, 'i')})
            .sort({"updatedAt": -1})
            .skip(+offset)
            .limit(+pageSize)
            .exec();
    }

    async countImages() {
        return this.imageModel.count().exec()
    }

    async deleteImage(id: string): Promise<Image | Error> {
        console.log(`Delete image with id: ${id}`);
        try {
            const imageData = await this.imageModel.findById(id).exec();
            unlinkSync(imageData.path+'');
            return this.imageModel.findByIdAndDelete(id).exec();
        } catch (e){
            console.log(e.message);
            return e
        }
    }


}
