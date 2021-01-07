import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { BoardEntity } from './board-entity.schema';
import { InventoryTransaction } from './inventory-transaction.schema';
import { PlayerInventory } from './player-inventory.schema';

export type PlayerGameStateDocument = PlayerGameState & Document


export class BoardState {

    entities: BoardEntity[]
}

@Schema()
export class PlayerGameState {
    @Prop()
    installId: string;

    @Prop()
    inventory: PlayerInventory;

    @Prop()
    boardState: BoardState;
}

export const PlayerGameStateSchema = SchemaFactory.createForClass(PlayerGameState)