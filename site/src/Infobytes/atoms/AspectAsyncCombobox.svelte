<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let optionsPromise: Promise<any[]>;
</script>

<label for={inputId}>{name}</label>
{#await optionsPromise}
    <Input id={inputId} name={inputId} type="select" bind:value>
        <option disabled selected value={null}> -- {name} -- </option>
        <option disabled value={null}>Lade...</option>
    </Input>
{:then data}
    <Input id={inputId} name={inputId} type="select" bind:value>
        <option disabled selected value={null}> -- {name} -- </option>
        {#each data as aspect}
            <option value={aspect._id}>{aspect.name}</option>
        {/each}
    </Input>
{:catch error}
    <Input id={inputId} name={inputId} type="select" bind:value>
        <option disabled selected value={null}> -- {name} -- </option>
        <option disabled value={null}>An error occurred!</option>
    </Input>
{/await}
