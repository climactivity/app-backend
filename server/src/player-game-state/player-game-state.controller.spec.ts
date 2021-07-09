import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGameStateController } from './player-game-state.controller';

describe('PlayerGameStateController', () => {
  let controller: PlayerGameStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerGameStateController],
    }).compile();

    controller = module.get<PlayerGameStateController>(PlayerGameStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
