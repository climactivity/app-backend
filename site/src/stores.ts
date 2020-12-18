import { text } from 'svelte/internal';
import { writable } from 'svelte/store'

export class Answer {
    value: string = "";
    correct: boolean = false;
}

export class Question {
    question: string = "";
    answers: Answer[] = [new Answer()]
}

export class Infobit {
    doc = {
      type: "doc",
      content: [
        {
          type: "paragraph"
        }
      ]
    }
    selection = {
      type: "text",
      anchor: 1,
      head: 1
    }
}

export class Infobyte {
    _id: string = "";
    name: string = "";
    published: boolean = false;
    region: string = "DE";
    language: string = "DE";
    frontmatter?: string = "";
    questions?: Question[] = [new Question()]
    infobits: any[];
}

export const currentInfobyte: Observable<DeepPartial<Infobyte>> = writable( new Infobyte())
const isProd = __frontend_env.env.isProd
const apiUrl = __frontend_env.env.SVELTE_APP_API_HOST_BASE || ''
export var baseUrl =  __frontend_env && isProd ? apiUrl : ''
