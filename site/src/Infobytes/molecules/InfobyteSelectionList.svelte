<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";
    import InfobyteSelectionListItem from "../atoms/InfobyteSelectionListItem.svelte";
    import type { infobyteIdentifier } from "../particles/Infobyte";

    export let infobytes: infobyteIdentifier[];
</script>

<ListGroup vertical>
    {#each infobytes as infobyte}
        <InfobyteSelectionListItem {infobyte} />
    {/each}
    <CreateInfobyteButton />
</ListGroup>
