import { Module } from '@nestjs/common';
import { PlayerGameStateService } from './player-game-state.service';
import { PlayerGameStateController } from './player-game-state.controller';

@Module({
  providers: [PlayerGameStateService],
  controllers: [PlayerGameStateController]
})
export class PlayerGameStateModule {}
