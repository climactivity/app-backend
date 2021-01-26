import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';
import { CreateAspectForLocaleDto } from './dto/create-aspect-for-locale.dto';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { LocalizedAspectDto } from './dto/localized-aspect.dto';
import { UpdateAspectForLocaleDto } from './dto/update-aspect-for-locale.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';
import { Aspect, AspectDocument } from './schemas/aspect.schema';

@Injectable()
export class AspectService {

  private logger = new Logger(AspectService.name)
  constructor(@InjectModel(Aspect.name) private aspectModel: Model<AspectDocument>) { }

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
    return this.aspectModel.deleteOne({ _id: id }).exec();
  }

  async createFromLocalizedAspect(createAspectForLocaleDto: CreateAspectForLocaleDto) {
    return this.create(this.createAspectFromCreateAspectForLocale(createAspectForLocaleDto))
  }

  createAspectFromCreateAspectForLocale(createAspectForLocaleDto: CreateAspectForLocaleDto): CreateAspectDto {
    const localizedOptions = createAspectForLocaleDto.localizedTrackingData.options.map((option, index) => {
      var value = option.option;
      var reward = option.reward
      var locale_id = `option-${index}-${createAspectForLocaleDto.forLanguage}`
      return { locale_id, value, reward }
    })
    return {
      bigpoint: createAspectForLocaleDto.bigpoint,
      name: createAspectForLocaleDto.name,
      icon: createAspectForLocaleDto.icon,
      infoGraph: createAspectForLocaleDto.infoGraph,
      localizedStrings: [{
        language: createAspectForLocaleDto.forLanguage,
        strings: {
          title: createAspectForLocaleDto.title
        }
      }],
      trackingData: {
        localized_strings: {
          language: createAspectForLocaleDto.forLanguage,
          strings: {
            question: createAspectForLocaleDto.localizedTrackingData.question,
            options: localizedOptions.map(localizedOption => {
              let { locale_id, value } = localizedOption
              return { locale_id, value }
            })
          }
        },
        options: localizedOptions.map(localizedOption => {
          let { locale_id, reward } = localizedOption
          return { locale_id, reward }
        })
      }
    }
  }

  updateAspectFromUpdateAspectForLocale(id, updateAspectForLocale: CreateAspectForLocaleDto) {
    const aspectData = this.createAspectFromCreateAspectForLocale(updateAspectForLocale)
    return this.aspectModel.findByIdAndUpdate(id, aspectData).exec();
  }

  async findAllLocalized(lang: string, region: string): Promise<LocalizedAspectDto[]> {
    try {
      return (await this.aspectModel.find({region}).exec()).map(aspect => this.localizeAspect(aspect, lang, region))
    } catch (e) {
      this.logger.log(e)
      return e
    }
  }

  async findAllLocalizedForBigpoint(bigpoint: string, lang: string, region: string) {
    try {
      return (await this.aspectModel.find({region, bigpoint}).exec()).map(aspect => this.localizeAspect(aspect, lang, region))
    } catch (e) {
      this.logger.log(e)
      return e
    }
  }

  async findLocalizedAspect(id: string, lang: string, region: string) {
    const aspect = await this.aspectModel.findById(id).exec();
    return this.localizeAspect(aspect, lang, region);
  }

  localizeAspect(aspect, lang: string, region: string): LocalizedAspectDto {

    let aspectLocalizedStrings = aspect.localizedStrings.find(ls => ls.language == lang);
    let localizedTrackingData = aspect.trackingData.localized_strings
    let error = (!aspectLocalizedStrings || !localizedTrackingData) ? `Aspect not localized to ${lang} in ${region}!` : ""
    if (error !== "") {
      let aspectLocalizedStrings = aspect.localizedStrings[0];
      let localizedTrackingData = aspect.trackingData.localized_strings  
      return {
        _id: aspect._id,
        bigpoint: aspect.bigpoint,
        name: aspect.name,
        title: aspectLocalizedStrings.strings.title,
        forLanguage: aspectLocalizedStrings.language,
        forRegion: region,
        localizedTrackingData: {
          question: localizedTrackingData.strings.question,
          options: aspect.trackingData.options.map(option => {
            return {
              reward: option.reward,
              option: localizedTrackingData.strings.options.find(locale => locale.locale_id == option.locale_id).value
            }
          }
          )
        },
        message: error
      }
    } else {

      return {
        _id: aspect._id,
        bigpoint: aspect.bigpoint,
        name: aspect.name,
        title: aspectLocalizedStrings.strings.title,
        forLanguage: lang,
        forRegion: region,
        localizedTrackingData: {
          question: localizedTrackingData.strings.question,
          options: aspect.trackingData.options.map(option => {
            return {
              reward: option.reward,
              option: localizedTrackingData.strings.options.find(locale => locale.locale_id == option.locale_id).value
            }
          }
          )
        },
      }
    }

  }
}
