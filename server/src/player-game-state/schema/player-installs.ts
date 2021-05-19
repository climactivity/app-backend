import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type PlayerInstallsDocument = PlayerInstalls & Document

@Schema()
export class PlayerInstalls {

    _id: string; 
    
    @Prop()
    installs: string[]; 

    @Prop({type: Object})
    cyNetworkAccount: any;
}
export const PlayerInstallsSchema = SchemaFactory.createForClass(PlayerInstalls)