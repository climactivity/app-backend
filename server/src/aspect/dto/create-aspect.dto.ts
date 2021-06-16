import { AspectLocalization, Factor, TrackingData } from "../schemas/aspect.schema";

export class CreateAspectDto {
    readonly themenmonat: string;
    readonly templateType: string;
    readonly name: string;
    readonly icon?: any;
    readonly infoGraph?: any;
    readonly trackingData?: TrackingData;
    readonly localizedStrings: AspectLocalization[]; 
    readonly bigpoint: string;
    readonly factors: Factor[];
    readonly region: string;
    readonly published: boolean;
}
