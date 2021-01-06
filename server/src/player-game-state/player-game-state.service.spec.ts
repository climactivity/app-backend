import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGameStateService } from './player-game-state.service';

describe('PlayerGameStateService', () => {
  let service: PlayerGameStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerGameStateService],
    }).compile();

    service = module.get<PlayerGameStateService>(PlayerGameStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
