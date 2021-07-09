import { CreateRewardDto } from "src/rewards/dto/create-reward.dto";
import { Reward } from "src/rewards/schemas/reward.schema";
import { QuestAspectFilter, QuestQuestFilter } from "../schema/quest.schema";
 
export class CreateQuestDto {
    readonly deadline: Date;
    readonly maxDuration: number;
    readonly startDate: Date;
    readonly region: string; 
    readonly language: string
    readonly title: string
    readonly text: any;
    readonly baseReward: CreateRewardDto;
    readonly published: boolean;
    readonly questAspectFilter: QuestAspectFilter[] = []; 
    readonly questQuestFilter: QuestQuestFilter[] = [];
    readonly questFollowup: string; // immediately following quest
    readonly alertTrackedAspect: string; // affected aspect _id field
    readonly linkToAfter: string; 
    readonly altIcon: string;
    readonly userSelectable: boolean;
    readonly reward: Reward;
    readonly triggerTrackingUpdate: boolean;
    readonly numRepeat: number;
    readonly repeatAfter: number; 
}
