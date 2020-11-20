import { writable } from 'svelte/store'

export class Answer {
    value: string = "";
    correct: boolean = false;
}

export class Question {
    question: string = "";
    answers: Answer[] = [new Answer()]
}

export class Infobyte {
    _id: string = "";
    name: string = "";
    frontmatter?: string = "";
    questions?: Question[] = [new Question()]
}

export const currentInfobyte = writable( new Infobyte())