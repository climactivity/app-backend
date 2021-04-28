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

    async getImages(offset, pageSize) { 
        return this.imageModel.find({}, {},{skip: +offset, limit: +pageSize, sort: "updatedAt"}).exec();
    }

}
