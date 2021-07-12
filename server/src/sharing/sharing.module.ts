import { Module } from '@nestjs/common';
import { InfobyteModule } from 'src/infobyte/infobyte.module';
import { SharingController } from './sharing.controller';

@Module({
    imports: [InfobyteModule],
    controllers: [SharingController],
})
export class SharingModule {}
