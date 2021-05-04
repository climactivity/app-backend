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
export class QuestLocalization {
    language: string
    title: string
     text: string
}
export class QuestDto {

    deadline: string;
    maxDuration: string;
    startDate: string;
    region: string; 
    questLocalization: QuestLocalization[] = []
    baseReward: Reward;
    published: boolean;
    questAspectFilter: QuestAspectFilter[] = []; 
    questQuestFilter: QuestQuestFilter[] = [];
    alertTrackedAspect: string; // affected aspect _id field
    linkToAfter: string; 
    
    }
    