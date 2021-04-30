import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { BoardEntity } from './board-entity.schema';
import { InventoryTransaction } from './inventory-transaction.schema';
import { PlayerInstalls } from './player-installs';
import { PlayerInventory } from './player-inventory.schema';

export type PlayerGameStateDocument = PlayerGameState & Document


export class BoardState {

    entities: BoardEntity[]
}

@Schema()
export class PlayerGameState {
    @Prop()
    playerInstalls: PlayerInstalls;

    @Prop()
    inventory: PlayerInventory;

    @Prop({type: Object})
    board_entites: any;
   
    @Prop({type: Object}) 
    tracking_states: any; 

    @Prop({type: Object})
    tracking_updates: any[];
}

export const PlayerGameStateSchema = SchemaFactory.createForClass(PlayerGameState)