import { Module } from '@nestjs/common';
import { AspectModule } from 'src/aspect/aspect.module';
import { InfobyteModule } from 'src/infobyte/infobyte.module';
import { QuestModule } from 'src/quest/quest.module';
import { TreeTemplateModule } from 'src/tree-template/tree-template.module';
import { ClientCacheController } from './client-cache.controller';
import { ClientCacheService } from './client-cache.service';

@Module({
  imports: [AspectModule, InfobyteModule, TreeTemplateModule, QuestModule],
  controllers: [ClientCacheController],
  providers: [ClientCacheService]
})
export class ClientCacheModule {}
