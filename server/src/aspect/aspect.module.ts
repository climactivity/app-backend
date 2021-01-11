import { Module } from '@nestjs/common';
import { AspectService } from './aspect.service';
import { AspectController } from './aspect.controller';
import { RewardsModule } from 'src/rewards/rewards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Aspect, AspectSchema } from './schemas/aspect.schema';

@Module({
  imports: [
    RewardsModule,
    MongooseModule.forFeature([{
      name: Aspect.name, schema: AspectSchema
    }])
  ],
  controllers: [AspectController],
  providers: [AspectService]
})
export class AspectModule {}
