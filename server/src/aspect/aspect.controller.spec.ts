import { Test, TestingModule } from '@nestjs/testing';
import { AspectController } from './aspect.controller';
import { AspectService } from './aspect.service';

describe('AspectController', () => {
  let controller: AspectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AspectController],
      providers: [AspectService],
    }).compile();

    controller = module.get<AspectController>(AspectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
