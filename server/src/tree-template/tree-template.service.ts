import { Model } from 'mongoose';
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TreeTemplate, TreeTemplateDocument } from './schemas/treeTemplate.schema'
import { TreeTemplateDto } from './dto/treeTemplate.dto'

@Injectable()
export class TreeTemplateService {

    private readonly logger = new Logger(TreeTemplateService.name);
    constructor(@InjectModel(TreeTemplate.name) private TreeTemplateModel : Model<TreeTemplateDocument>) {}

    async create(dto: TreeTemplateDto): Promise<TreeTemplate> {
        const treeTemplate = new this.TreeTemplateModel(dto);
        return treeTemplate.save()
    }

    async findAll(): Promise<TreeTemplate[]> {
        return this.TreeTemplateModel.find().exec()
    }

    async findById(id): Promise<TreeTemplate> {
        return this.TreeTemplateModel.findById(id).exec()
    }

    async update(id, dto): Promise<TreeTemplate> {
        return this.TreeTemplateModel.findByIdAndUpdate(id, dto).exec();
    }

    async delete(id): Promise<TreeTemplate> {
        return this.TreeTemplateModel.findByIdAndDelete(id).exec()
    }
}
