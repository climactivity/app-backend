import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';
import { AspectService } from './aspect.service';
import { CreateAspectForLocaleDto } from './dto/create-aspect-for-locale.dto';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';

@Controller('localized-aspect')
export class AspectController {
  constructor(private readonly aspectService: AspectService) {}

  @Post()
  create(@Body() createAspectDto: CreateAspectForLocaleDto) {
    return this.aspectService.createFromLocalizedAspect(createAspectDto);
  }

  @Get()
  findAll(@Query() query) {
    let region = query.r || "DE"; 
    let  lang = query.l || "DE";

    return this.aspectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aspectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAspectDto: UpdateAspectDto) {
    return this.aspectService.update(id, updateAspectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aspectService.remove(id);
  }
}
