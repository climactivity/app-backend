export interface Aspect {
    name: string,
    trackingRewards : TrackingRewards[],
    localizedData: LocalizedAspectData
}

type LocalizedAspectData = Map<LocalizationLanguage, AspectData>

export interface AspectData {
    title: string,
    question: string,
    rewardAnswers: RewardAnswer
}

interface TrackingRewards {
    id: number,
    xp: number,
    coins: number,
    water: number
}

type RewardAnswer = Map<number, string>

export enum LocalizationLanguage {
    DE= "Deutsch",
    EN = "English"
}