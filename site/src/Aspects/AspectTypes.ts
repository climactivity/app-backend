export interface Aspect {
    name: string,
    trackingOptions: TrackingOption[],
    question: string

}

export interface TrackingOption {
    id: string,
    answer: string,
    xp: number,
    coins: number,
    water: number
}