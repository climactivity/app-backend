import { Test, TestingModule } from '@nestjs/testing';
import { TreeTemplateService } from './tree-template.service';
import { TreeTemplate, TreeTemplateSchema, TreeTemplateDocument } from './schemas/treeTemplate.schema'
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoDbCfg from '../../globalConfig.json'

describe('TreeTemplateService', () => {
  let service: TreeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(mongoDbCfg.mongoUri), MongooseModule.forFeature([{ name: TreeTemplate.name, schema: TreeTemplateSchema}])],
      providers: [TreeTemplateService],
    }).compile();

    service = module.get<TreeTemplateService>(TreeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
