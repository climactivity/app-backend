import { CreateRewardDto } from "src/rewards/dto/create-reward.dto";

export class CreateQuestDto {
    readonly deadline: Date;
    readonly maxDuration: Date;
    readonly region: string; 
    readonly questLocalization?: {language: string, title: string, text: string}[]
    readonly reward: CreateRewardDto;
    readonly published: boolean;
}
