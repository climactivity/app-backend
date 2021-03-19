export default interface Aspect {
     _id: string;
     name: string;
     title: string;
     icon?: any;
     infoGraph?: any;
     localizedTrackingData?: {
        question: string; 
        options: 
            {
                option: string, 
                reward: any,
                level: number,
                co2value?: number
            }[]
        
    };
     forRegion: string;
     forLanguage: string;
     message?: string;
     bigpoint?:string;
     localizedFactors?: {
        id: number,
        name: string
     }[]

}

interface TrackingOption {
    id: string,
    answer: string,
    xp: number,
    coins: number,
    water: number
}