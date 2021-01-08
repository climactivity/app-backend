import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type TrackedAspectsDocument = TrackedAspects & Document

export class Tracking {

    aspectName: string; 
    level: number; 
    
}

@Schema()
export class TrackedAspects {
    @Prop()
    playerId: string; 
}
export const TrackedAspectsSchema = SchemaFactory.createForClass(TrackedAspects)