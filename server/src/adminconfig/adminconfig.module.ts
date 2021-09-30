import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminconfigController } from './adminconfig.controller';

@Module({
  controllers: [AdminconfigController],
  imports: [ConfigModule],

})
export class AdminconfigModule {}
