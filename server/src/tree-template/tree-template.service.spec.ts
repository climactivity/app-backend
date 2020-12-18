import { Test, TestingModule } from '@nestjs/testing';
import { TreeTemplateService } from './tree-template.service';

describe('TreeTemplateService', () => {
  let service: TreeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeTemplateService],
    }).compile();

    service = module.get<TreeTemplateService>(TreeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
