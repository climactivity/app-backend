<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import { currentInfobitIndex, Infobit } from '$lib/stores/stores';
    import CreateInfobitButton from "../atoms/CreateInfobitButton.svelte";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";
    import InfobitSelectionListItem from "../atoms/InfobitSelectionListItem.svelte";

    export let infobits: Infobit[];

    let selectedInfobitIndex: number;

    currentInfobitIndex.subscribe((index) => (selectedInfobitIndex = index));
</script>

<ListGroup vertical>
    {#each infobits as infobit, i}
        <InfobitSelectionListItem
            {infobit}
            index={i}
            active={i === selectedInfobitIndex}
        />
    {/each}
    <CreateInfobitButton />
</ListGroup>
