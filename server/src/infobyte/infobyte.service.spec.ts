import { Test, TestingModule } from '@nestjs/testing';
import { InfobyteService } from './infobyte.service';

describe('InfobyteService', () => {
  let service: InfobyteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfobyteService],
    }).compile();

    service = module.get<InfobyteService>(InfobyteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
