<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let options: string[];
</script>

<label for={inputId}>{name}</label>
<Input id={inputId} name={inputId} type="select" bind:value>
    {#each options as option}
        <option>{option}</option>
    {/each}
</Input>
