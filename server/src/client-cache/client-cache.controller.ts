import { Body, Controller, Post, Logger } from '@nestjs/common';
import { ClientCacheService } from './client-cache.service';
import { CacheManifestDto } from './dto/cache-manifest.dto';
import { ChachePreflightDto } from './dto/cache-preflight.dto';

@Controller('client-cache')
export class ClientCacheController {
    constructor(private readonly clientCacheService: ClientCacheService) {}

    private logger = new  Logger(ClientCacheController.name)
    @Post()
    checkIsCurrent(@Body() chachePreflightDto: ChachePreflightDto) {
        this.logger.verbose(chachePreflightDto)
        this.clientCacheService.getLastModification(chachePreflightDto)
    }

    @Post('/update')
    checkForContentUpdate(@Body() currentCacheManifestDto: CacheManifestDto) {
        this.logger.verbose(currentCacheManifestDto)
        return this.clientCacheService.getDeltaUpdate(currentCacheManifestDto)
    }

}
