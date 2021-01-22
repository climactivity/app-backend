import { Body, Controller, Post, Logger } from '@nestjs/common';
import { CacheManifestDto } from './dto/cache-manifest.dto';
import { ChachePreflightDto } from './dto/cache-preflight.dto';

@Controller('client-cache')
export class ClientCacheController {

    private logger = new  Logger(ClientCacheController.name)
    @Post()
    checkIsCurrent(@Body() chachePreflightDto: ChachePreflightDto) {
        this.logger.verbose(chachePreflightDto)
    }

    @Post('/update')
    checkForContentUpdate(@Body() currentCacheManifestDto: CacheManifestDto) {
        this.logger.verbose(currentCacheManifestDto)
    }

}
