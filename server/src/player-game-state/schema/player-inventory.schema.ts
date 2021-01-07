import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { InventoryTransaction } from './inventory-transaction.schema';

export type PlayerInventoryDocument = PlayerInventory & Document


@Schema()
export class PlayerInventory {

    @Prop()
    coins: number

    @Prop()
    history: InventoryTransaction[]

}

export const PlayerInventorySchema = SchemaFactory.createForClass(PlayerInventory)