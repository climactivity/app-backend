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
    frontmatter?: string = "";
    questions?: Question[] = [new Question()]
    infobits: any[] = [{
        doc: {
          type: "doc",
          content: [
            {
              type: "paragraph"
            }
          ]
        },
        selection: {
          type: "text",
          anchor: 1,
          head: 1
        }
      }]
}

export const currentInfobyte = writable( new Infobyte())