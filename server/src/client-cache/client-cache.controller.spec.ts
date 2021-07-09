import { Test, TestingModule } from '@nestjs/testing';
import { ClientCacheController } from './client-cache.controller';

describe('ClientCacheController', () => {
  let controller: ClientCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCacheController],
    }).compile();

    controller = module.get<ClientCacheController>(ClientCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
