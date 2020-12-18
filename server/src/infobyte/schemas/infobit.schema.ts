import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type InfoBitDocument = InfoBit & Document

@Schema()
export class InfoBit {
    @Prop()
    content: string;
}

export const InfoBitSchema = SchemaFactory.createForClass(InfoBit)