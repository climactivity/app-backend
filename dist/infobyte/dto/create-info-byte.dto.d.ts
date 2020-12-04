export declare class CreateInfoByteDto {
    readonly name: string;
    readonly region: string;
    readonly language: string;
    readonly frontmatter: string;
    readonly questions?: [
        {
            question: string;
            answers: [
                [
                    {
                        value: string;
                        correct: boolean;
                    }
                ]
            ];
        }
    ];
    readonly infobits?: [{
        value: string;
    }];
    readonly xp?: number;
    readonly published: boolean;
}
