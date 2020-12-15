import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type ImageDocument = Image & Document

@Schema()
export class Image {
    @Prop()
    filePath: string;

    @Prop()
    url: string;
    
    @Prop({type: Date, default: Date.now()})
    createdAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image)