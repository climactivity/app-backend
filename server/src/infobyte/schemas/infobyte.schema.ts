import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type InfoByteDocument = InfoByte & Document

export class Answer {
    value: string;
    correct: boolean;
}

export class Question {
    question: string;
    answers: Answer[]; 
}

export class InfoBit {
    value: any;
}

@Schema()
export class InfoByte {
    @Prop()
    region: string;

    @Prop()
    language: string;

    @Prop()
    name: string;

    @Prop()
    frontmatter: string;

    @Prop(Array)
    infobits: Object[]

    @Prop([Question])
    questions: Question[]

    @Prop()
    xp: number

    @Prop()
    published: boolean;

    @Prop()
    aspect: string; 

    @Prop() 
    factor: number;

    @Prop()
    difficulty: number;

    @Prop()
    position: number;
}

export const InfoByteSchema = SchemaFactory.createForClass(InfoByte)