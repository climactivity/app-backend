<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import { currentInfobitIndex, Infobit } from "../../stores";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";
    import InfobitSelectionListItem from "../atoms/InfobitSelectionListItem.svelte";

    export let infobits: Infobit[];

    let selectedInfobitIndex: number;

    currentInfobitIndex.subscribe((index) => (selectedInfobitIndex = index));
</script>

<ListGroup vertical>
    {#each infobits as infobit, i}
        <InfobitSelectionListItem
            index={i}
            active={i === selectedInfobitIndex}
        />
    {/each}
    <CreateInfobyteButton />
</ListGroup>
