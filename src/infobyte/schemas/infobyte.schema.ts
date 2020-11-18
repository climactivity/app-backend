import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
    value: string;
}

@Schema()
export class InfoByte {
    @Prop()
    name: string;

    @Prop()
    frontmatter: string;

    @Prop([InfoBit])
    infobits: InfoBit[]

    @Prop([Question])
    questions: Question[]

    @Prop()
    xp: number
}

export const InfoByteSchema = SchemaFactory.createForClass(InfoByte)