import { Test, TestingModule } from '@nestjs/testing';
import { InfobyteController } from './infobyte.controller';

describe('InfobyteController', () => {
  let controller: InfobyteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfobyteController],
    }).compile();

    controller = module.get<InfobyteController>(InfobyteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
