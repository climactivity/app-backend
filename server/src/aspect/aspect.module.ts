import { Module } from '@nestjs/common';
import { AspectService } from './aspect.service';
import { AspectController } from './aspect.controller';
import { RewardsModule } from 'src/rewards/rewards.module';

@Module({
  imports: [RewardsModule],
  controllers: [AspectController],
  providers: [AspectService]
})
export class AspectModule {}
