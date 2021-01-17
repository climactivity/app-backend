<script lang="ts">
    import type {Aspect, TrackingRewards} from "../../AspectTypes";
    import TrackingOptionRewards from "../atoms/TrackingOptionRewards.svelte";
    import RemoveTrackingOptionButton from "../atoms/RemoveTrackingOptionButton.svelte";
    import TrackingOptionAnswer from "../atoms/TrackingOptionAnswer.svelte";

    export let aspect: Aspect;
    export let answer: string;
    export let reward: TrackingRewards

    export let clickHandler: (id: number) => void;
</script>

<tr>
    <TrackingOptionAnswer {answer}/>
    <TrackingOptionRewards {reward}/>
    <RemoveTrackingOptionButton {clickHandler} id={reward?.id}/>
</tr>