<script lang="ts">
    import { Container, ListGroupItem } from "sveltestrap";
    import {
        currentInfobitIndex,
        currentInfobyte,
        Infobit,
        Infobyte,
    } from "../../stores";
    import { getInfobyte } from "../InfobyteService";
    import type { infobyteIdentifier } from "../particles/Infobyte";
    import CreateInfobitButton from "./CreateInfobitButton.svelte";

    export let infobyte: infobyteIdentifier;

    let selectedInfobyte: Infobyte;
    let selectedInfobit: number;
    let isInfobyteActive = false;

    const onInfobyteSelected = async (infobyte: infobyteIdentifier) => {
        if (isInfobyteActive) {
            currentInfobyte.set(null);
        } else {
            const retrievedInfobyte = await getInfobyte(infobyte._id);
            currentInfobyte.set(retrievedInfobyte);
        }
        currentInfobitIndex.set(null);
    };

    const onInfobitSelected = (infobitIndex: number) => {
        if (selectedInfobit === infobitIndex) {
            currentInfobitIndex.set(null);
        } else {
            currentInfobitIndex.set(infobitIndex);
        }
    };

    currentInfobyte.subscribe((currentInfobyte: Infobyte) => {
        selectedInfobyte = currentInfobyte;
        isInfobyteActive = currentInfobyte?._id === infobyte._id;
    });

    currentInfobitIndex.subscribe((currentInfobitIndex: number) => {
        selectedInfobit = currentInfobitIndex;
    });
</script>

<ListGroupItem
    tag="button"
    action
    on:click={() => onInfobyteSelected(infobyte)}
    active={isInfobyteActive}
>
    {infobyte.name}
</ListGroupItem>

{#if isInfobyteActive}
    <Container>
        {#each selectedInfobyte.infobits as infobit, i}
            <ListGroupItem
                tag="button"
                action
                active={selectedInfobit === i}
                on:click={() => onInfobitSelected(i)}
            >
                Infobit Nr: {i + 1}
            </ListGroupItem>
        {/each}
        <CreateInfobitButton infobyte={selectedInfobyte} />
    </Container>
{/if}
