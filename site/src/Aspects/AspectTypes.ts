export default interface Aspect {
    name: string,
    trackingOptions: TrackingOption[],
    question: string

}

interface TrackingOption {
    id: string,
    answer: string,
    xp: string,
    coins: number,
    water: number
}