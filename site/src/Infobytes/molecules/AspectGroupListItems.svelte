<script lang="ts">
    import { Container, Collapse, ListGroupItem } from "sveltestrap";
    import InfobyteSelectionListItem from "../atoms/InfobyteSelectionListItem.svelte";
    import type {
        aspectIdentifier,
        infobyteIdentifier,
    } from "../particles/Infobyte";

    export let aspect: aspectIdentifier;
    export let infobytes: infobyteIdentifier[];

    let isOpen = false;
</script>

<ListGroupItem
    tag="button"
    action
    on:click={() => (isOpen = !isOpen)}
    active={isOpen}
>
    {aspect.name}
</ListGroupItem>

<Collapse bind:isOpen>
    <Container>
        {#each infobytes.filter((i) => i.aspect == aspect._id) as infobyte}
            <InfobyteSelectionListItem {infobyte} />
        {/each}
    </Container>
</Collapse>
