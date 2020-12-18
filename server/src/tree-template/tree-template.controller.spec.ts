import { Test, TestingModule } from '@nestjs/testing';
import { TreeTemplateController } from './tree-template.controller';

describe('TreeTemplateController', () => {
  let controller: TreeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreeTemplateController],
    }).compile();

    controller = module.get<TreeTemplateController>(TreeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
