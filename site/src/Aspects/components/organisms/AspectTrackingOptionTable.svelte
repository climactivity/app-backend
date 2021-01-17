<script lang="ts">
    import {Col, Container, Table} from 'sveltestrap';
    import type {Aspect} from "../../AspectTypes";
    import {LocalizationLanguage} from "../../AspectTypes";
    import TrackingOptionTableHeader from "../atoms/TrackingOptionTableHeader.svelte";
    import TrackingOptionTitle from "../atoms/TrackingOptionTitle.svelte";
    import TrackingRewardsTableBody from "../molecules/TrackingRewardsTableBody.svelte";
    import AddTrackingOptionButton from "../atoms/AddTrackingOptionButton.svelte";

    export let aspect: Aspect;
    export let selectedLanguage: LocalizationLanguage;

    function addTrackingOption() {
        if (aspect === null) return;

        let highestId = aspect.trackingRewards.length === 0
            ? 0
            : Math.max(...aspect?.trackingRewards.map(t => t.id)) + 1;

        let newTrackingReward = {
            id: highestId,
            coins: 0,
            water: 0,
            xp: 0
        }
        aspect?.trackingRewards = [...aspect?.trackingRewards, newTrackingReward]
        aspect?.localizedData.forEach(localizedData => localizedData.rewardAnswers.set(highestId, ""))
    }

</script>

<Col xs="auto">
    <TrackingOptionTitle/>
</Col>
<Col xs="auto">
    <AddTrackingOptionButton clickHandler={addTrackingOption}/>
</Col>
<Container>
    <Table bordered>
        <TrackingOptionTableHeader/>
        <TrackingRewardsTableBody {aspect} {selectedLanguage}/>
    </Table>
</Container>