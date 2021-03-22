<script lang="ts">
    import { ListGroupItem } from "sveltestrap";
    import { currentInfobyte } from "../../stores";
    import { getInfobyte } from "../InfobyteService";
    import type { infobyteIdentifier } from "../particles/Infobyte";

    export let infobyte: infobyteIdentifier;
    export let active: boolean;

    const onInfobyteSelected = async (infobyte: {
        name: string;
        _id: string;
    }) => {
        const retrievedInfobyte = await getInfobyte(infobyte._id);
        currentInfobyte.set(retrievedInfobyte);
    };
</script>

<ListGroupItem
    tag="button"
    action
    on:click={() => onInfobyteSelected(infobyte)}
    {active}
>
    {infobyte.name}
</ListGroupItem>
