import { Reward } from "src/rewards/schemas/reward.schema";
import { AspectLocalization, Factor, TrackingData } from "../schemas/aspect.schema";

export class LocalizedAspectDto {
    readonly themenmonat: string;
    readonly templateType: string;
    readonly _id: string;
    readonly name: string;
    readonly title: string;
    readonly frontmatter: string;
    readonly icon?: any;
    readonly infoGraph?: any;
    readonly localizedTrackingData?: {
        question: string; 
        footnote?: string;
        options: 
            {
                option: string, 
                reward: Reward,
                level: number,
                co2value?: number,
                waterFactor: number,
            }[]
        
    };
    readonly forRegion: string;
    readonly forLanguage: string;
    readonly message?: string;
    readonly bigpoint?:string;
    readonly localizedFactors?: {
        id: number,
        name: string,
        intro: string
    }[]; 
    readonly published: boolean;
}
