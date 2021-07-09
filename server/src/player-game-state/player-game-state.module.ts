import { Module } from '@nestjs/common';
import { PlayerGameStateService } from './player-game-state.service';
import { PlayerGameStateController } from './player-game-state.controller';
import { ChronoModule } from 'src/chrono/chrono.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardEntity, BoardEntitySchema } from './schema/board-entity.schema';
import { InventoryTransaction, InventoryTransactionSchema } from './schema/inventory-transaction.schema';
import { PlayerGameState, PlayerGameStateSchema } from './schema/player-game-state.schema';
import { PlayerInventory, PlayerInventorySchema } from './schema/player-inventory.schema';
import { TrackedAspects, TrackedAspectsSchema } from './schema/tracked-aspects.schema';
import { PlayerInstalls, PlayerInstallsSchema } from './schema/player-installs';

@Module({
  imports: [
    ChronoModule,
    MongooseModule.forFeature(
      [
        { name: BoardEntity.name, schema: BoardEntitySchema}, 
        { name: InventoryTransaction.name, schema: InventoryTransactionSchema}, 
        { name: PlayerGameState.name, schema: PlayerGameStateSchema}, 
        { name: PlayerInventory.name, schema: PlayerInventorySchema}, 
        { name: TrackedAspects.name, schema: TrackedAspectsSchema}, 
        { name: PlayerInstalls.name, schema: PlayerInstallsSchema}, 

      ]
    ),


  ],
  providers: [PlayerGameStateService],
  controllers: [PlayerGameStateController],
}) 
export class PlayerGameStateModule {}
