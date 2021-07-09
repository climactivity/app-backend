import { Test, TestingModule } from '@nestjs/testing';
import { ClientCacheService } from './client-cache.service';

describe('ClientCacheService', () => {
  let service: ClientCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCacheService],
    }).compile();

    service = module.get<ClientCacheService>(ClientCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
