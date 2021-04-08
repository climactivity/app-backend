import { Injectable, Logger } from '@nestjs/common';
import { AspectService } from 'src/aspect/aspect.service';
import { LocalizedAspectDto } from 'src/aspect/dto/localized-aspect.dto';
import { InfobyteService } from 'src/infobyte/infobyte.service';
import { TreeTemplateService } from 'src/tree-template/tree-template.service';
import { CacheManifestDto } from './dto/cache-manifest.dto';
import { ChachePreflightDto } from './dto/cache-preflight.dto';

@Injectable()
export class ClientCacheService {
    
    private logger = new Logger(ClientCacheService.name)
    constructor(
        private readonly aspectSerice: AspectService,
        private readonly treeTemplateSerice: TreeTemplateService,
        private readonly infoByteSerice: InfobyteService,
                
        ) {}

    async getLastModification(chachePreflightDto: ChachePreflightDto) {
        // TODO get timestamp from last update
        return {
            "update_at": new Date().getTime(),
            "should_update": true
        }
    }

    async getDeltaUpdate(currentCacheManifestDto: CacheManifestDto) {
        let currentAspects = await this.aspectSerice.findAllLocalized(currentCacheManifestDto.lang, currentCacheManifestDto.region)
        currentAspects = currentAspects.filter(a => a.published)
        let currentTreeTemplates = await this.treeTemplateSerice.findAll();
        let currentInfoBytes = await this.infoByteSerice.findEverything(); 
        currentInfoBytes = currentInfoBytes.filter(i => i.published)
        return {
            "update_at": new Date().getTime(),
            "current_tree_templates": currentTreeTemplates,
            "current_aspects": currentAspects,
            "current_infobytes": currentInfoBytes
        }
    }

}
