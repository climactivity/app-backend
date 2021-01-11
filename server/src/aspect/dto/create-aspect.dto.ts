import { TrackingData } from "../schemas/aspect.schema";

export class CreateAspectDto {
    readonly name: string;
    readonly icon?: any;
    readonly quizGraph?: any;
    readonly trackingData?: Partial<TrackingData>;
}
