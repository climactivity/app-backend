<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import { currentInfobyte, Infobyte } from "../../stores";
    import InfobyteSelectionListItem from "../atoms/InfobyteSelectionListItem.svelte";
    import type { infobyteIdentifier } from "../particles/Infobyte";

    export let infobytes: infobyteIdentifier[];

    let selectedInfobyte: Infobyte;

    currentInfobyte.subscribe((value) => {
        selectedInfobyte = value;
    });
</script>

<ListGroup vertical>
    {#each infobytes as infobyte}
        <InfobyteSelectionListItem
            {infobyte}
            active={selectedInfobyte._id === infobyte._id}
        />
    {/each}
</ListGroup>
