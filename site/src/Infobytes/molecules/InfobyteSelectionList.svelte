<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";
    import type {
        aspectIdentifier,
        infobyteIdentifier,
    } from "../particles/Infobyte";
    import AspectGroupListItems from "./AspectGroupListItems.svelte";

    export let infobytes: infobyteIdentifier[];
    export let aspects: aspectIdentifier[];
</script>

<ListGroup vertical>
    {#each aspects as aspect}
        <AspectGroupListItems
            {aspect}
            infobytes={infobytes.filter((i) => i.aspect == aspect._id)}
        />
    {/each}
    <CreateInfobyteButton />
</ListGroup>
