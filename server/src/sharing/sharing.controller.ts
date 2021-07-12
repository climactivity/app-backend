import { BadRequestException, Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { response } from 'express';
import { AspectService } from 'src/aspect/aspect.service';
import { Aspect } from 'src/aspect/schemas/aspect.schema';
import { InfobyteService } from 'src/infobyte/infobyte.service';
import { InfoByte } from 'src/infobyte/schemas/infobyte.schema';

@Controller('sharing')
export class SharingController {

    constructor(private readonly infobyteService: InfobyteService) {}

    private logger = new Logger(SharingController.name)

    @Get(':id/:index')
    async fetchInfobit(@Param('id') id: string, @Param('index') index: string) {
        try {
            const infobyte : InfoByte = await this.infobyteService.findById(id);
            const _index = Number(index)
            if (_index >= infobyte.infobits.length) {
                throw new BadRequestException("Index out of bounds!")
            }
            const infobit = infobyte.infobits[_index]
            infobit["title"] = infobyte.name
            return infobit   
        } catch (e) {
            Logger.log(e.message)
            throw new BadRequestException('Infobyte not found!');
        }
    } 

}
