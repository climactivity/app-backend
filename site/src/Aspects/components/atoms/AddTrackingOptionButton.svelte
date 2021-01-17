<script lang="ts">
    import {Button} from 'sveltestrap';

    export let clickHandler: () => void;
</script>

<Button color="success" on:click={clickHandler}>Add</Button>
