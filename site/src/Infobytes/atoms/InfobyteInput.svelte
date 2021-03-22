<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
</script>

<label for={inputId}>{name}</label>
<Input id={inputId} name={inputId} bind:value />
