import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quest, QuestSchema } from './schema/quest.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quest.name, schema: QuestSchema}])],
  controllers: [QuestController],
  providers: [QuestService],
  exports: [QuestService]
})
export class QuestModule {}
