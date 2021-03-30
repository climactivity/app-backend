<script lang="ts">
    import { dataset_dev } from "svelte/internal";
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let optionsPromise: Promise<any[]>;
</script>

<label for={inputId}>{name}</label>
{#await optionsPromise}
    <Input id={inputId} name={inputId} type="select" >
        <option disabled selected > -- {name} -- </option>
        <option disabled >Lade...</option>
    </Input>
{:then data}
    {#if Array.isArray(data)}
        {#if data.length > 0}
            <Input id={inputId} name={inputId} type="select" bind:value>
                <option disabled selected value={null}> -- {name} -- </option>
                {#each data as factor}
                    <option value={factor.id}>{factor.name}</option>
                {/each}
            </Input>
        {:else}
            <Input id={inputId} name={inputId} type="select" >
                <option disabled> -- {name} -- </option>
                <option disabled 
                    >Wähle zu erst einen Aspekt!</option
                >
            </Input>
        {/if}
    {:else}
        <Input id={inputId} name={inputId} type="select">
            <option disabled > -- {name} -- </option>
            <option disabled
                >Es gibt noch keine Gesichtspunkte!</option
            >
        </Input>
    {/if}
{:catch error}
    <Input id={inputId} name={inputId} type="select" bind:value>
        <option disabled selected value={null}> -- {name} -- </option>
        <option disabled value={null}>An error occurred!</option>
    </Input>
{/await}
