import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';
import { AspectService } from './aspect.service';
import { CreateAspectForLocaleDto } from './dto/create-aspect-for-locale.dto';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectForLocaleDto } from './dto/update-aspect-for-locale.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';

@Controller('localized-aspect')
export class LocalizedAspectController {
  constructor(private readonly aspectService: AspectService) {}

  @Post()
  create(@Body() createAspectDto: CreateAspectForLocaleDto) {
    return this.aspectService.createFromLocalizedAspect(createAspectDto);
  }

  @Get()
  findAll(@Query() query) {
    let region = query.r || "DE"; 
    let  lang = query.l || "DE";

    return this.aspectService.findAllLocalized(lang, region);
  }

  @Get(':id')
  findOne(@Query() query, @Param('id') id: string) {
    let region = query.r || "DE"; 
    let  lang = query.l || "DE";
    return this.aspectService.findLocalizedAspect(id, lang, region);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAspectDto: CreateAspectForLocaleDto) {
    return this.aspectService.updateAspectFromUpdateAspectForLocale(id, updateAspectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aspectService.remove(id);
  }
}
