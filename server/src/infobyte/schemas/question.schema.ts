import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type QuestionDocument = Question & Document

export class Answer {
    value: string;
    correct: boolean;
}

@Schema()
export class Question {
    @Prop()
    question: string;

    @Prop([Answer])
    answers: Answer[]; 

}

export const QuestionSchema = SchemaFactory.createForClass(Question)