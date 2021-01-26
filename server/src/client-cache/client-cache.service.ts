import { Injectable, Logger } from '@nestjs/common';
import { AspectService } from 'src/aspect/aspect.service';
import { LocalizedAspectDto } from 'src/aspect/dto/localized-aspect.dto';
import { CacheManifestDto } from './dto/cache-manifest.dto';
import { ChachePreflightDto } from './dto/cache-preflight.dto';

@Injectable()
export class ClientCacheService {
    
    private logger = new Logger(ClientCacheService.name)
    constructor(private readonly aspectSerice: AspectService) {}

    async getLastModification(chachePreflightDto: ChachePreflightDto) {
        // TODO get timestamp from last update
        return {
            "update_at": new Date().getTime(),
            "should_update": true
        }
    }

    async getDeltaUpdate(currentCacheManifestDto: CacheManifestDto) {
        let currentAspects = await this.aspectSerice.findAllLocalized(currentCacheManifestDto.lang, currentCacheManifestDto.region)
        return {
            "update_at": new Date().getTime(),
            //"current_tree_templates": null,
            "current_aspects": currentAspects,
            //"current_infobytes": null
        }
    }

}
