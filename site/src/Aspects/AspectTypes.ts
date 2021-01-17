export class Aspect {
    name: string;
    trackingRewards: TrackingRewards[];
    localizedData: LocalizedAspectData;
    persisted? : boolean;

    constructor(name: string) {
        this.name = name;
        this.trackingRewards = [];
        this.localizedData = new Map<LocalizationLanguage, AspectData>();
        this.persisted = false;
    }
}

export interface TrackingRewards {
    id: number,
    xp: number,
    coins: number,
    water: number
}

type LocalizedAspectData = Map<LocalizationLanguage, AspectData>

export interface AspectData {
    title: string,
    question: string,
    rewardAnswers: RewardAnswer
}

type RewardAnswer = Map<number, string>

export enum LocalizationLanguage {
    DE = "Deutsch",
    EN = "English"
}