export class UpdateInfoByteDto {
    readonly name: string; 

    readonly frontmatter: string;
    readonly questions: [{question: string, answers: [
        [{value: string, correct: boolean}]
    ]}]    

    readonly infobits: [{value: string}]

    readonly xp: number;

}