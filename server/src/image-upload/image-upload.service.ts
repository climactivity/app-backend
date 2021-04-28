import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageUploadService {

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


}
