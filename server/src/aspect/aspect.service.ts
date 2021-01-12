import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';
import { Aspect, AspectDocument } from './schemas/aspect.schema';

@Injectable()
export class AspectService {

  private logger = new Logger(AspectService.name)
  constructor(@InjectModel(Aspect.name) private aspectModel: Model<AspectDocument>) {}

  async create(createAspectDto: CreateAspectDto) {
    const newAspect = await new this.aspectModel(createAspectDto).save()
    this.logger.log( createAspectDto, "dto")
    this.logger.log(newAspect, "entity")

    return newAspect;
  }

  findAll() {
    return this.aspectModel.find().exec()
  }

  findOne(id: string) {
    return this.aspectModel.findById(id).exec()
  }

  update(id: string, updateAspectDto: UpdateAspectDto) {
    return this.aspectModel.findByIdAndUpdate(id, updateAspectDto).exec();
  }

  remove(id: string) {
    return this.aspectModel.deleteOne({_id: id}).exec(); 
  }
}
