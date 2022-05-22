<script lang="ts">
    import { ListGroupItem } from "sveltestrap";
    import { currentInfobit, currentInfobitIndex, Infobit } from '$lib/stores/stores';

    export let infobit: Infobit;
    export let index: number;
    export let active: boolean;

    const onInfobitSelected = () => {
        if (active) {
            currentInfobitIndex.set(null);
            currentInfobit.set(null);
        } else {
            currentInfobitIndex.set(index);
            currentInfobit.set(infobit);
        }
    };
</script>

<ListGroupItem
    tag="button"
    action
    on:click={() => onInfobitSelected()}
    {active}
>
    Infobit Nr: {index + 1}
</ListGroupItem>
