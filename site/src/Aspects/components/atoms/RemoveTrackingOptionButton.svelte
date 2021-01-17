<script lang="ts">
    import {Button} from 'sveltestrap';

    export let clickHandler: (id: number) => void;
    export let id : number;
</script>

<td>
    <Button color="danger" on:click={clickHandler(id)}>Remove</Button>
</td>
