import { Test, TestingModule } from '@nestjs/testing';
import { ChronoService } from './chrono.service';

describe('ChronoService', () => {
  let service: ChronoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChronoService],
    }).compile();

    service = module.get<ChronoService>(ChronoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
