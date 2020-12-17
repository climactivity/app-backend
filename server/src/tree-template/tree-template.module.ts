import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TreeTemplateController } from './tree-template.controller';
import { TreeTemplateService } from './tree-template.service';

import { TreeTemplate, TreeTemplateSchema } from './schemas/treeTemplate.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: TreeTemplate.name, schema: TreeTemplateSchema}])],
  controllers: [TreeTemplateController],
  providers: [TreeTemplateService]
})
export class TreeTemplateModule {}
