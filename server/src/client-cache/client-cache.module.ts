import { Module } from '@nestjs/common';
import { ClientCacheController } from './client-cache.controller';
import { ClientCacheService } from './client-cache.service';

@Module({
  controllers: [ClientCacheController],
  providers: [ClientCacheService]
})
export class ClientCacheModule {}
