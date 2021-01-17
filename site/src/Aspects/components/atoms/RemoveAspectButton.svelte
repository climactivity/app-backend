<script lang="ts">
    import {Button} from 'sveltestrap';

    export let clickHandler: () => void;
</script>

<Button color="danger" on:click={clickHandler}>Remove</Button>
