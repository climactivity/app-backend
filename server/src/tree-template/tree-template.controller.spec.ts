import { Test, TestingModule } from '@nestjs/testing';
import { TreeTemplateController } from './tree-template.controller';
import { TreeTemplateService } from './tree-template.service';
import { TreeTemplate, TreeTemplateSchema, TreeTemplateDocument } from './schemas/treeTemplate.schema'
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoDbCfg from '../../globalConfig.json'

describe('TreeTemplateController', () => {
  let controller: TreeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(mongoDbCfg.mongoUri), MongooseModule.forFeature([{ name: TreeTemplate.name, schema: TreeTemplateSchema}])],
      providers: [TreeTemplateService],
      controllers: [TreeTemplateController],
    }).compile();

    controller = module.get<TreeTemplateController>(TreeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
