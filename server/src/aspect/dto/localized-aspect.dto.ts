import { Reward } from "src/rewards/schemas/reward.schema";
import { AspectLocalization, TrackingData } from "../schemas/aspect.schema";

export class LocalizedAspectDto {
    readonly _id: string;
    readonly name: string;
    readonly title: string;
    readonly icon?: any;
    readonly infoGraph?: any;
    readonly localizedTrackingData?: {
        question: string; 
        options: 
            {
                option: string, 
                reward: Reward,
                level: number,
                co2value?: number
            }[]
        
    };
    readonly forRegion: string;
    readonly forLanguage: string;
    readonly message?: string;
    readonly bigpoint?:string;
}
