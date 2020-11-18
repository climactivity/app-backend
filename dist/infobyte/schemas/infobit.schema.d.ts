import { Document } from 'mongoose';
export declare type InfoBitDocument = InfoBit & Document;
export declare class InfoBit {
    content: string;
}
export declare const InfoBitSchema: import("mongoose").Schema<any>;
