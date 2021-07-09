import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type RewardDocument = Reward & Document

@Schema()
export class Reward {

    @Prop()
    xp: number; 

    @Prop()
    coins: number; 

    @Prop()
    water: number; 

}

export const RewardSchema = SchemaFactory.createForClass(Reward); 