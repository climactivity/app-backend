import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { Reward } from 'src/rewards/schemas/reward.schema';


export type QuestDocument = Quest & Document;

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

@Schema({timestamps: { createdAt: 'createdAt' }})
export class Quest {

    @Prop(Date)
    deadline: Date;

    @Prop(Date)
    maxDuration: number;

    @Prop(Date)
    startDate: Date;

    @Prop(String)
    region: string; 

    @Prop(String)
    language: string;

    @Prop(String)
    title: string; 

    @Prop({type: Object})
    text: any; 

    @Prop(String)
    altIcon: string; 
    
    @Prop(Reward)
    baseReward: Reward;

    @Prop(Boolean)
    published: boolean;

    @Prop({type: QuestAspectFilter, default:[]})
    questAspectFilter: QuestAspectFilter[]
    
    @Prop({type: QuestQuestFilter, default:[]})
    questQuestFilter: QuestQuestFilter[]

    @Prop(String)
    alertTrackedAspect: string; 

    @Prop(String)
    linkToAfter: string; 

    @Prop()
    userSelectable: boolean;

    @Prop(Reward)
    reward: Reward;

    @Prop()
    numRepeat: number;
    
    @Prop()
    triggerTrackingUpdate: boolean;

    @Prop()
    repeatAfter: number;
}


export const QuestSchema = SchemaFactory.createForClass(Quest);