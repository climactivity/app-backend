import type {Aspect} from "./AspectTypes";
import {LocalizationLanguage} from "./AspectTypes";

export const mockAspects: Aspect[] = [
    {
        name: "First Aspect",
        persisted: true,
        trackingRewards:
            [
                {id: 0, xp: 10, coins: 0, water: 1},
                {id: 1, xp: 50, coins: 0, water: 2},
                {id: 2, xp: 100, coins: 0, water: 3},
                {id: 3, xp: 250, coins: 0, water: 4},
                {id: 4, xp: 500, coins: 0, water: 5}
            ],
        localizedData: new Map([
            [LocalizationLanguage.DE,
                {
                    title: "Pflanzliche Ernährung",
                    question: "Wie oft isst Du Fleisch?",
                    rewardAnswers: new Map([
                        [0, "Ich esse jeden Tag Fleisch"],
                        [1, "Ich esse es 4-5x pro Woche"],
                        [2, "Ich esse es 1-3x pro Woche"],
                        [3, "Ich lebe vegetarisch"],
                        [4, "Ich lebe vegan"],
                    ])
                }],
            [LocalizationLanguage.EN, {
                title: "Plantbased Nutrition",
                question: "How often do you eat meat?",
                rewardAnswers: new Map([
                    [0, "I eat meat every day."],
                    [1, "Around 4 or 5 times a week"],
                    [2, "Less than 3 times a week"],
                    [3, "I'm a vegetarian"],
                    [4, "I'm vegan"],
                ])
            }],
        ])
    }]