import type { Reward } from "../Rewards/RewardTypes";

export const enum FillterType {
    "REQURIED", "EXCLUDED", "PREFERED" 
}

export class QuestAspectFilter {
    filterType: FillterType
    aspectId: String
    trackingLevel: Number
}

export class QuestQuestFilter {
    filterType: FillterType
    questId: String
}

export class QuestDto {
    _id?: string;
    deadline: string;
    maxDuration: string;
    startDate: string;
    region: string; 
    language: string
    title: string
    text: any;
    baseReward: Reward;
    published: boolean;
    questAspectFilter: QuestAspectFilter[] = []; 
    questQuestFilter: QuestQuestFilter[] = [];
    questFollowup: string; // immediately following quest
    alertTrackedAspect: string; // affected aspect _id field
    linkToAfter: string; 
    altIcon: string;
}
    