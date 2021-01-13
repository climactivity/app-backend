import type {Aspect, TrackingOption} from "./AspectTypes";

export const mockAspects: Aspect[] = [
    {
        name: "First Aspect",
        trackingOptions: <TrackingOption[]>[{
            id: "0",
            answer: "First Answer",
            xp: 50,
            coins: 10,
            water: 200
        }], question: "First Question"
    },
    {
        name: "Second Aspect",
        trackingOptions: <TrackingOption[]>[
            {
                id: "1",
                answer: "Second Answer",
                xp: 200,
                coins: 10,
                water: 200
            },
            {
                id: "2",
                answer: "Second Answer",
                xp: 200,
                coins: 10,
                water: 200
            },

        ], question: "Second Question"
    },
    {
        name: "Third Aspect",
        trackingOptions: <TrackingOption[]>[{
            id: "2",
            answer: "Third Answer",
            xp: 200,
            coins: 10,
            water: 200
        }], question: "Third Question"
    }];