import { CreateRewardDto } from "src/rewards/dto/create-reward.dto";
import { QuestAspectFilter, QuestQuestFilter } from "../schema/quest.schema";

export class CreateQuestDto {
    readonly deadline: Date;
    readonly maxDuration: Date;
    readonly region: string; 
    readonly questLocalization: {language: string, title: string, text: string}[]
    readonly reward: CreateRewardDto;
    readonly published: boolean;
    readonly questAspectFilter: QuestAspectFilter[]; 
    readonly questQuestFilter: QuestQuestFilter[];
}
