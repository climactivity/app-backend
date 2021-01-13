import { AspectLocalization, TrackingData } from "../schemas/aspect.schema";

export class CreateAspectDto {
    readonly name: string;
    readonly icon?: any;
    readonly infoGraph?: any;
    readonly trackingData?: TrackingData;
    readonly localizedStrings: AspectLocalization[]; 
}
