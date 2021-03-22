<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let optionsPromise: Promise<[string, number?][]>;
</script>

<label for={inputId}>{name}</label>
<Input id={inputId} name={inputId} type="select" bind:value>
    <option disabled selected value={null}> -- {name} -- </option>
    {#await optionsPromise}
        <option disabled value={null}>Lade...</option>
    {:then data}
        {#each data as option}
            <option value={option[1]}>{option[0]}</option>
        {/each}
    {:catch error}
        <option disabled value={null}>An error occurred!</option>
    {/await}
</Input>
