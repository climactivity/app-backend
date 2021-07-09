import { Test, TestingModule } from '@nestjs/testing';
import { InfobyteService } from './infobyte.service';
import * as mongoDbCfg from '../../globalConfig.json'
import { MongooseModule } from '@nestjs/mongoose';
import { InfoByte } from './schemas/infobyte.schema';
import { InfoBitSchema } from './schemas/infobit.schema';

describe('InfobyteService', () => {
  let service: InfobyteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(mongoDbCfg.mongoUri), MongooseModule.forFeature([{ name: InfoByte.name, schema: InfoBitSchema}])],
      providers: [InfobyteService],
    }).compile();

    service = module.get<InfobyteService>(InfobyteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
