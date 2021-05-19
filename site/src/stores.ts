import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export class Answer {
  value: string = "";
  correct: boolean = false;
}

export class Question {
  question: string = "";
  answers: Answer[] = [new Answer()]
  infobit?: number = 0;
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
  infobits: any[] = [];
  aspect: string;
  factor: string;
  difficulty: number;
  position: number;
}

export class Aspect {
  _id: string = "";
  name: string = "";
}

declare const __frontend_env; //

export const currentInfobyte: Writable<Infobyte> = writable(null)
export const currentInfobitIndex: Writable<number> = writable(null)
export const currentInfobit: Writable<Infobit> = writable(null)
export const currentQuestionName: Writable<string> = writable(null)
export const currentQuestionIndex: Writable<number> = writable(null)
export const currentQuestion: Writable<Question> = writable(null)
export const isProd = __frontend_env.env.isProd
const apiUrl = (__frontend_env.env.SVELTE_APP_API_HOST_BASE || '')
export var baseUrl = (__frontend_env && isProd ? apiUrl : window.location.href.replace(window.location.hash, ""))
console.log("base URL set to: ", baseUrl);

export const myFetch = () => {

}