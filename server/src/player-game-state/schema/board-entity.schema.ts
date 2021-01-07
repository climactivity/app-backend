import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type BoardEntityDocument = BoardEntity & Document

@Schema()
export class BoardEntity {

    @Prop({
        unique: true
    })
    entity_id: string;

    @Prop()
    template_name: string;

    @Prop()
    bigpoint: string; 
    
    @Prop()
    aspect: string;

    @Prop()
    placedAt: Date;

    @Prop()
    stage: string;

    @Prop()
    lastWatered: Date; 

    @Prop() 
    growthInterval: number; // in sec

    @Prop()
    currentlyGrowing: boolean; // 
}
export const BoardEntitySchema = SchemaFactory.createForClass(BoardEntity)