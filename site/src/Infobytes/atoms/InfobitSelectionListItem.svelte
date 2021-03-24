<script lang="ts">
    import { ListGroupItem } from "sveltestrap";
    import { currentInfobitIndex } from "../../stores";

    export let index: number;
    export let active: boolean;

    const onInfobitSelected = () => {
        if (active) {
            currentInfobitIndex.set(null);
        } else {
            currentInfobitIndex.set(index);
        }
    };
</script>

<ListGroupItem tag="button" action on:click={onInfobitSelected} {active}>
    Infobit Nr: {index + 1}
</ListGroupItem>
