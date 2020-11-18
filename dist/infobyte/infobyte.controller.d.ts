import { CreateInfoByteDto } from './dto/create-info-byte.dto';
import { UpdateInfoByteDto } from './dto/update-info-byte.dto';
import { InfobyteService } from './infobyte.service';
import { InfoByte } from './schemas/infobyte.schema';
export declare class InfobyteController {
    private readonly infobyteService;
    constructor(infobyteService: InfobyteService);
    create(createInfoByteDto: CreateInfoByteDto): Promise<InfoByte>;
    findAll(): Promise<InfoByte[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateInfoByteDto: UpdateInfoByteDto): Promise<any>;
    remove(id: string): Promise<any>;
}
