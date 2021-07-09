import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfobyteController } from './infobyte.controller';

import { InfoByte, InfoByteSchema } from './schemas/infobyte.schema';
import { InfobyteService } from './infobyte.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: InfoByte.name, schema: InfoByteSchema}])],
    controllers: [InfobyteController],
    providers: [InfobyteService],
    exports: [InfobyteService]
})
export class InfobyteModule {}
