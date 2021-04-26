import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { Quest, QuestDocument } from './schema/quest.schema';

@Injectable()
export class QuestService {


  private readonly logger = new Logger(QuestService.name);
  constructor(
    @InjectModel(Quest.name) private questModel : Model<QuestDocument>
    ) {}

  create(createQuestDto: CreateQuestDto) {
    let quest = new this.questModel(createQuestDto);
    return quest.save();
  }

  findAll() {
    return this.questModel.find().exec();
  }

  findOne(id: any) {
    return this.questModel.findById(id).exec();
  }

  async update(id: any, updateQuestDto: UpdateQuestDto) {
    const status = await this.questModel.updateOne({_id:id}, updateQuestDto).exec();
    return this.questModel.findById(id).exec(); 
  }

  remove(id: any) {
    return this.questModel.findByIdAndDelete(id).exec()
  }
}
