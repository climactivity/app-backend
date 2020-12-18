import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type TreeTemplateDocument = TreeTemplate & Document

export class TreeState {
    stage: number;
    water: number;
    water_needed: number;
    bigpoint: string;
    aspect: string
}

@Schema()
export class TreeTemplate {
    @Prop()
    template_name: string;
    @Prop()
	texture_name: string;
    @Prop()
    ui_name: string;
    @Prop()
	preview_name: number;
    @Prop()
	coin_value: number;
    @Prop()
	bigpoint_available: [string];
    @Prop()
    initial_state: TreeState;
    @Prop()
    archetype: string
}

export const TreeTemplateSchema = SchemaFactory.createForClass(TreeTemplate)