import type { Content } from "../Editor/editor-types";

export default interface Aspect extends Content {
    themenmonat: string,
    templateType: string,
    published: boolean;
    _id: string;
    name: string;
    title: string;
    frontmatter: string;
    icon?: any;
    infoGraph?: any;
    localizedTrackingData?: {
        question: string;
        footnote: string;
        options:
        {
            option: string,
            reward: any,
            level: number,
            co2value?: number,
            waterFactor: number
        }[]

    };
    forRegion: string;
    forLanguage: string;
    message?: string;
    bigpoint?: string;
    localizedFactors?: {
        id: number,
        name: string,
        intro: string
    }[]

}

interface TrackingOption {
    id: string,
    answer: string,
    xp: number,
    coins: number,
    water: number
}