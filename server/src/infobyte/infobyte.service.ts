import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InfoByte, InfoByteDocument } from './schemas/infobyte.schema';
import { CreateInfoByteDto } from './dto/create-info-byte.dto';

@Injectable()
export class InfobyteService {
    constructor(@InjectModel(InfoByte.name) private infoByteModel: Model<InfoByteDocument>) { }

    async create(createInfoByteDto: CreateInfoByteDto): Promise<InfoByte> {
        const createdInfoByte = new this.infoByteModel(createInfoByteDto);
        return createdInfoByte.save();
    }

    async findAll(): Promise<InfoByte[]> {
        return this.infoByteModel.find().select('name _id aspect').exec();
    }

    async findEverything(): Promise<InfoByte[]> {
        return this.infoByteModel.find().exec();
    }

    async findById(id): Promise<any> {
        return this.infoByteModel.findById(id).exec();
    }

    async update(id, updateInfoByteDto): Promise<any> {
        return this.infoByteModel.findByIdAndUpdate(id, updateInfoByteDto).exec();
    }

    async delete(id): Promise<any> {
        return this.infoByteModel.findByIdAndDelete(id).exec();
    }

}
