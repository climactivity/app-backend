import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { assert } from 'console';
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
    const localizedOptions = createAspectForLocaleDto.localizedTrackingData == null ? null : createAspectForLocaleDto.localizedTrackingData.options.map((option, index) => {
      var value = option.option;
      var reward = option.reward;
      var level = option.level;
      var co2value = option.co2value ?? -1.0;

      var locale_id = `option-${index}-${createAspectForLocaleDto.forLanguage}`
      return { locale_id, value, reward, level }
    })
    return {
      bigpoint: createAspectForLocaleDto.bigpoint,
      name: createAspectForLocaleDto.name,
      icon: createAspectForLocaleDto.icon,
      region: createAspectForLocaleDto.forRegion,
      infoGraph: createAspectForLocaleDto.infoGraph,
      localizedStrings: [{
        language: createAspectForLocaleDto.forLanguage,
        strings: {
          title: createAspectForLocaleDto.title,
          factors: createAspectForLocaleDto.localizedFactors,
        }
      }],
      trackingData: {
        localized_strings: {
          language: createAspectForLocaleDto.forLanguage,
          strings: {
            question: createAspectForLocaleDto.localizedTrackingData == null ? null : createAspectForLocaleDto.localizedTrackingData.question,
            options:createAspectForLocaleDto.localizedTrackingData == null ? null : localizedOptions.map(localizedOption => {
              let { locale_id, value, level } = localizedOption
              return { locale_id, value, level }
            })
          }
        },
        options: createAspectForLocaleDto.localizedTrackingData == null ? null : localizedOptions.map(localizedOption => {
          let { locale_id, reward, level } = localizedOption
          return { locale_id, reward, level }
        })
      },
      factors: createAspectForLocaleDto.localizedFactors,
    }
  }

  updateAspectFromUpdateAspectForLocale(id, updateAspectForLocale: CreateAspectForLocaleDto) {
    const aspectData = this.createAspectFromCreateAspectForLocale(updateAspectForLocale)
    return this.aspectModel.findByIdAndUpdate(id, aspectData).exec();
  }

  async findAllLocalized(lang: string, region: string): Promise<LocalizedAspectDto[]> {
    try {
      const de = await this.aspectModel.find({ region }).exec()
      this.logger.log("de")

      this.logger.log(de)

      const l = de.map(aspect => this.localizeAspect(aspect, lang, region));
      this.logger.log("l")

      this.logger.log(l)
      return l
    } catch (e) {
      this.logger.log("hi", e)
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
    let error = (!aspectLocalizedStrings || !aspectLocalizedStrings.strings || !localizedTrackingData) ? `Aspect not localized to ${lang} in ${region}!` : ""
    if (error !== "") {

      let aspectLocalizedStrings = aspect.localizedStrings[0];
      let localizedTrackingData = aspect.trackingData.localized_strings  
      console.log("errros",aspectLocalizedStrings)

      return {
        _id: aspect._id,
        bigpoint: aspect.bigpoint,
        name: aspect.name,
        title: aspectLocalizedStrings.strings == null ? "MISSING LOCALE" : aspectLocalizedStrings.strings.title,
        forLanguage: aspectLocalizedStrings.language,
        forRegion: region,
        localizedFactors: aspectLocalizedStrings.strings == null ? null : aspectLocalizedStrings.strings.factors,
        localizedTrackingData: localizedTrackingData == null ? null : {
          question:  localizedTrackingData.strings.question,
          options: aspect.trackingData.options == null ? null : aspect.trackingData.options.map(option => {
            return {
              reward: option.reward,
              option: localizedTrackingData == null ? "MISSING LOCALE"  : localizedTrackingData.strings.options.find(locale => locale.locale_id == option.locale_id).value,
              level: option.level,
              co2value: option.co2value ?? -1.0
            }
          }
          )
        },

        message: error
      }
    } else {

      console.log(aspect, localizedTrackingData, aspectLocalizedStrings)
      return {
        _id: aspect._id,
        bigpoint: aspect.bigpoint,
        name: aspect.name,
        title: aspectLocalizedStrings.strings.title,
        forLanguage: lang,
        forRegion: region,
        localizedTrackingData: {
          question: localizedTrackingData.strings.question,
          options: aspect.trackingData.options == null ? null : aspect.trackingData.options.map(option => {
            return {
              reward: option.reward,
              option: localizedTrackingData.strings.options.find(locale => locale.locale_id == option.locale_id).value,
              level: option.level,
              co2value: option.co2value ?? -1.0
            }
          }
          )
        },
        localizedFactors: aspectLocalizedStrings.strings.factors
      }
    }

  }
}
