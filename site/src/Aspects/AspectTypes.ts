export default interface Aspect {
    name: string,
    trackingOptions: TrackingOption[],
    question: string

}

interface TrackingOption {
    id: string,
    answer: string,
    xp: number,
    coins: number,
    water: number
}