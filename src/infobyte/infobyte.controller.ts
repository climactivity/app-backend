import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateInfoByteDto } from './dto/create-info-byte.dto';
import { UpdateInfoByteDto } from './dto/update-info-byte.dto';
import { InfobyteService } from './infobyte.service';
import { InfoByte } from './schemas/infobyte.schema';

@Controller('infobyte')
export class InfobyteController {

    constructor(private readonly infobyteService: InfobyteService) {}

    @Post()
    create(@Body() createInfoByteDto: CreateInfoByteDto) {
      return this.infobyteService.create(createInfoByteDto);
    }
  
    @Get()
    findAll(): Promise<InfoByte[]> {
        return this.infobyteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.infobyteService.findById(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateInfoByteDto: UpdateInfoByteDto) {
        return this.infobyteService.update(id, updateInfoByteDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.infobyteService.delete(id);
    }


}
