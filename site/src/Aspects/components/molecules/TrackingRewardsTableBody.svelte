<script lang="ts">
    import {Button, Input, InputGroup} from 'sveltestrap';

    import type {Aspect} from "../../AspectTypes";
    import {LocalizationLanguage} from "../../AspectTypes";
    import TrackingRewardRow from "./TrackingRewardRow.svelte";

    export let aspect: Aspect;
    export let selectedLanguage: LocalizationLanguage;



    function removeTrackingOption(id: number) {
        if (aspect === null) return;
        aspect.trackingRewards = aspect.trackingRewards.filter(t => t.id !== id);
        aspect.localizedData.forEach(localizedData => localizedData.rewardAnswers.delete(id));
    }

</script>


<tbody>
{#each aspect?.trackingRewards as reward}
    <TrackingRewardRow {aspect} {reward}
                       answer={aspect?.localizedData?.get(selectedLanguage)?.rewardAnswers?.get(reward.id)}
                        clickHandler={removeTrackingOption}
    />
{/each}

</tbody>