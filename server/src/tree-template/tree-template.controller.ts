import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TreeTemplateDto } from './dto/treeTemplate.dto';
import { TreeTemplate } from './schemas/treeTemplate.schema';
import { TreeTemplateService } from './tree-template.service';

@Controller('tree-template')
export class TreeTemplateController {

    constructor(private readonly treeTemplateService: TreeTemplateService) {}

    @Post()
    create(@Body() treeTemplateDto: TreeTemplateDto) {
        return this.treeTemplateService.create(treeTemplateDto);
    }

    @Get()
    findAll(): Promise<TreeTemplate[]> {
        return this.treeTemplateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.treeTemplateService.findById(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() treeTemplateDto: TreeTemplateDto) {
        return this.treeTemplateService.update(id, treeTemplateDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.treeTemplateService.delete(id);
    }

}
