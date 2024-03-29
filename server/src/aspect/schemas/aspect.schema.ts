import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 
import { Reward } from 'src/rewards/schemas/reward.schema';
import { Image } from 'src/image-upload/schemas/image.schema'; 
import { InfoByte } from 'src/infobyte/schemas/infobyte.schema';

export type AspectDocument = Aspect & Document

export class TrackingData {
    options: {locale_id: string, reward: Reward, level: number, co2value?: number, waterFactor?: number,
    }[]
    localized_strings: TrackingDataLocalization;
}

export class TrackingDataLocalization {
    language: string;
    strings: {
        question: string; 
        footnote: string;
        options: {locale_id: string, value: string}[]
    }
}

export class AspectLocalization {
    language: string; 
    strings: {
        title: string
        factors?: {id: number, name: string, intro: string }[]
        frontmatter: string;
    }
}

export class Infograph {
    entries: {
        info: InfoByte, 
        requires: InfoByte[]
        layer: number
    }[]
}

export class Factor {
    id: number ;

}

@Schema()
export class Aspect {
    @Prop()
    name: string; 

    @Prop()
    icon: Image; 

    @Prop()
    infograph: Infograph; 

    @Prop()
    trackingData: TrackingData; 

    @Prop()
    localizedStrings: AspectLocalization[]; 

    @Prop()
    region: string;

    @Prop()
    bigpoint: string;

    @Prop()
    factors: Factor[];
    
    @Prop()
    published: boolean;

    @Prop()
    themenmonat: string;
    
    @Prop()
    readonly templateType: string;
}

export const AspectSchema = SchemaFactory.createForClass(Aspect); 