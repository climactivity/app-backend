<script lang="ts">
    import { ListGroupItem } from "sveltestrap";
    import {
        currentInfobitIndex,
        currentInfobyte,
        Infobyte,
    } from "../../stores";
    import { getInfobyte } from "../InfobyteService";
    import type { infobyteIdentifier } from "../particles/Infobyte";

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
