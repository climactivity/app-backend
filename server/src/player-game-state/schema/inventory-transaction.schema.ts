import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type InventoryTransactionDocument = InventoryTransaction & Document


@Schema()
export class InventoryTransaction {

    @Prop(Date)
    transactionDate: Date
    

}
export const InventoryTransactionSchema = SchemaFactory.createForClass(InventoryTransaction)