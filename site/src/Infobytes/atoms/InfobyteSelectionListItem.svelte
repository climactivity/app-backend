<script lang="ts">
    import { Container, ListGroupItem } from "sveltestrap";
    import { currentInfobyte, Infobit, Infobyte } from "../../stores";
    import { getInfobyte } from "../InfobyteService";
    import type { infobyteIdentifier } from "../particles/Infobyte";
    import CreateInfobitButton from "./CreateInfobitButton.svelte";

    export let infobyte: infobyteIdentifier;

    let selectedInfobyte: Infobyte;
    let active = false;

    const onInfobyteSelected = async (infobyte: infobyteIdentifier) => {
        if (active) {
            currentInfobyte.set(null);
        } else {
            const retrievedInfobyte = await getInfobyte(infobyte._id);
            currentInfobyte.set(retrievedInfobyte);
        }
    };

    currentInfobyte.subscribe((currentInfobyte: Infobyte) => {
        selectedInfobyte = currentInfobyte;
        active = currentInfobyte?._id === infobyte._id;
    });
</script>

<ListGroupItem
    tag="button"
    action
    on:click={() => onInfobyteSelected(infobyte)}
    {active}
>
    {infobyte.name}
</ListGroupItem>

{#if active}
    <Container>
        {#each selectedInfobyte.infobits as infobit, i}
            <ListGroupItem tag="button" action>
                Infobit Nr: {i}
            </ListGroupItem>
        {/each}
        <CreateInfobitButton infobyte={selectedInfobyte} />
    </Container>
{/if}
