import { Model } from 'mongoose';
import { InfoByte, InfoByteDocument } from './schemas/infobyte.schema';
import { CreateInfoByteDto } from './dto/create-info-byte.dto';
export declare class InfobyteService {
    private infoByteModel;
    constructor(infoByteModel: Model<InfoByteDocument>);
    create(createInfoByteDto: CreateInfoByteDto): Promise<InfoByte>;
    findAll(): Promise<InfoByte[]>;
    findById(id: any): Promise<any>;
    update(id: any, updateInfoByteDto: any): Promise<any>;
    delete(id: any): Promise<any>;
}
