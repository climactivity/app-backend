import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { Reward } from 'src/rewards/schemas/reward.schema';

export type AspectDocument = Aspect & Document

export class TrackingData {
    question: string
    options: {value: string, reward: Reward}[] 
}

@Schema()
export class Aspect {
    @Prop()
    name: string; 

    @Prop()
    icon: any; 

    @Prop()
    quizGraph: any; 

    @Prop()
    trackingData: TrackingData; 

    @Prop()
    localizedStrings: any; 

}

export const AspectSchema = SchemaFactory.createForClass(Aspect); 