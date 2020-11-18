import { Document } from 'mongoose';
export declare type InfoByteDocument = InfoByte & Document;
export declare class Answer {
    value: string;
    correct: boolean;
}
export declare class Question {
    question: string;
    answers: Answer[];
}
export declare class InfoBit {
    value: string;
}
export declare class InfoByte {
    name: string;
    frontmatter: string;
    infobits: InfoBit[];
    questions: Question[];
    xp: number;
}
export declare const InfoByteSchema: import("mongoose").Schema<any>;
