import { Module } from '@nestjs/common';
import { PlayerGameStateService } from './player-game-state.service';
import { PlayerGameStateController } from './player-game-state.controller';
import { ChronoModule } from 'src/chrono/chrono.module';

@Module({
  imports: [
    ChronoModule,
  ],
  providers: [PlayerGameStateService],
  controllers: [PlayerGameStateController],
}) 
export class PlayerGameStateModule {}
