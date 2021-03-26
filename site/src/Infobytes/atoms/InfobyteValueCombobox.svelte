<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let options: [string, number][];
</script>

<label for={inputId}>{name}</label>
<Input id={inputId} name={inputId} type="select" bind:value>
    {#each options as option}
        <option value={option[1]}>{option[0]}</option>
    {/each}
</Input>
