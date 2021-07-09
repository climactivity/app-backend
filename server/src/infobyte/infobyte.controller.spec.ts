import { Test, TestingModule } from '@nestjs/testing';
import { InfobyteController } from './infobyte.controller';
import * as mongoDbCfg from '../../globalConfig.json'
import { MongooseModule } from '@nestjs/mongoose';
import { InfoByte } from './schemas/infobyte.schema';
import { InfoBitSchema } from './schemas/infobit.schema';
import { InfobyteService } from './infobyte.service';


describe('InfobyteController', () => {
  let controller: InfobyteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(mongoDbCfg.mongoUri), MongooseModule.forFeature([{ name: InfoByte.name, schema: InfoBitSchema}])],
      providers: [InfobyteService],
      controllers: [InfobyteController],
    }).compile();

    controller = module.get<InfobyteController>(InfobyteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
