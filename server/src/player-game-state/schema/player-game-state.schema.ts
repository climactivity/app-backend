import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type PlayerGameStateDocument = PlayerGameState & Document

@Schema()
export class PlayerGameState {
    @Prop()
    installId: string;
    
}

export const PlayerGameStateSchema = SchemaFactory.createForClass(PlayerGameState)