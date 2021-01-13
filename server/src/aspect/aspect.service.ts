import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAspectForLocaleDto } from './dto/create-aspect-for-locale.dto';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { LocalizedAspectDto } from './dto/localized-aspect.dto';
import { UpdateAspectForLocaleDto } from './dto/update-aspect-for-locale.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';
import { Aspect, AspectDocument } from './schemas/aspect.schema';

@Injectable()
export class AspectService {

  private logger = new Logger(AspectService.name)
  constructor(@InjectModel(Aspect.name) private aspectModel: Model<AspectDocument>) {}

  async create(createAspectDto: CreateAspectDto) {
    const newAspect = await new this.aspectModel(createAspectDto).save()
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

  async createFromLocalizedAspect(createAspectForLocaleDto: CreateAspectForLocaleDto) {
    return this.create(this.createAspectFromCreateAspectForLocale(createAspectForLocaleDto))
  }

  createAspectFromCreateAspectForLocale(createAspectForLocaleDto: CreateAspectForLocaleDto): CreateAspectDto { 
    const localizedOptions =  createAspectForLocaleDto.localizedTrackingData.options.map((option, index) => {
      var value = option.option; 
      var reward = option.reward
      var locale_id = `option-${index}-${createAspectForLocaleDto.forLanguage}`
      return {locale_id, value, reward}
    }) 
    return {
      name: createAspectForLocaleDto.name,
      icon: createAspectForLocaleDto.icon,
      infoGraph: createAspectForLocaleDto.infoGraph,
      localizedStrings: [{
        language: createAspectForLocaleDto.forLanguage,
        strings: {
          title: createAspectForLocaleDto.title
      }}],
      trackingData: {
        localized_strings: {
          language: createAspectForLocaleDto.forLanguage,
          strings: {
            question: createAspectForLocaleDto.localizedTrackingData.question,
            options: localizedOptions.map(localizedOption => {
              let {locale_id, value} = localizedOption
              return {locale_id, value}
            })
          }
        },
        options: localizedOptions.map(localizedOption => {
          let {locale_id, reward} = localizedOption
          return {locale_id, reward}
        })
      }
    }
  }

  updateAspectFromUpdateAspectForLocale(updateAspectForLocale: UpdateAspectForLocaleDto): UpdateAspectDto {
    return this.createAspectFromCreateAspectForLocale(updateAspectForLocale)
  }
}
