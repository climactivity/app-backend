import { CreateRewardDto } from "src/rewards/dto/create-reward.dto";
import { QuestAspectFilter, QuestQuestFilter } from "../schema/quest.schema";

export class CreateQuestDto {
    readonly deadline: Date;
    readonly maxDuration: Date;
    readonly startDate: Date;
    readonly region: string; 
    readonly questLocalization: {language: string, title: string, text: string}[]
    readonly baseReward: CreateRewardDto;
    readonly published: boolean;
    readonly questAspectFilter: QuestAspectFilter[]; 
    readonly questQuestFilter: QuestQuestFilter[];
    readonly alertTrackedAspect: string; // affected aspect _id field
    readonly linkToAfter: string; 
}
