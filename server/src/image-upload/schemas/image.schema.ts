import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type ImageDocument = Image & Document

@Schema({timestamps: { createdAt: 'createdAt' }})
export class Image {

    @Prop()
    url: string;

    @Prop()
    encoding: string;

    @Prop()
    originalname: string 
    
    @Prop()
    mimetype: string
    
    @Prop()
    destination: '/Users/vovin/Documents/GitHub/app-backend/site/public/img'
    
    @Prop()
    filename: string;

    @Prop()
    path: string;    
    @Prop()
    size: number

}

export const ImageSchema = SchemaFactory.createForClass(Image)