import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { Reward } from 'src/rewards/schemas/reward.schema';


export type QuestDocument = Quest & Document;

export class QuestLocalization {

    @Prop(String)
    language: string 

    @Prop(String)
    title: string

    @Prop(String)
    text: string

}

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
    maxDuration: Date;

    @Prop(String)
    region: string; 

    @Prop([QuestLocalization])
    questLocalization?: QuestLocalization[]

    @Prop(Reward)
    reward: Reward;

    @Prop(Boolean)
    published: boolean;

    @Prop([ QuestAspectFilter ])
    aspectFilter: QuestAspectFilter[]
    
    @Prop([ QuestQuestFilter ])
    questQuestFilter: QuestQuestFilter[]

}


export const QuestSchema = SchemaFactory.createForClass(Quest);