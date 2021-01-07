import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type PlayerInstallsDocument = PlayerInstalls & Document

@Schema()
export class PlayerInstalls {
    @Prop()
    installs: string[]; 

}
export const PlayerInstallsSchema = SchemaFactory.createForClass(PlayerInstalls)