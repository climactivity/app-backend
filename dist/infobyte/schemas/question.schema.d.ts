import { Document } from 'mongoose';
export declare type QuestionDocument = Question & Document;
export declare class Answer {
    value: string;
    correct: boolean;
}
export declare class Question {
    question: string;
    answers: Answer[];
}
export declare const QuestionSchema: import("mongoose").Schema<any>;
