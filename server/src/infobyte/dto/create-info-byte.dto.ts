export class CreateInfoByteDto {

    readonly name: string; 
    readonly region: string; 
    readonly language: string; 
    readonly frontmatter: string;
    readonly questions?: [{question: string, answers: [
        [{value: string, correct: boolean}]
    ]}]    
    readonly infobits?: [any]
    readonly xp?: number;
    readonly published: boolean; 
    readonly aspect: string; 
    readonly factor: number;
    readonly difficulty: number;
}