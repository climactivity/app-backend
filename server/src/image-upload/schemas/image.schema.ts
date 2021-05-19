import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type ImageDocument = Image & Document

@Schema({timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})
export class Image {

    @Prop()
    url: string;

    @Prop()
    encoding: string;

    @Prop()
    originalname: string;
    
    @Prop()
    mimetype: string;
    
    @Prop()
    destination: string; 
    
    @Prop()
    filename: string;

    @Prop()
    path: string; 

    @Prop()
    size: number

    @Prop()
    title: string;

    @Prop()
    license: string;

    @Prop()
    credit: string;

    @Prop()
    relativeUrl: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image)