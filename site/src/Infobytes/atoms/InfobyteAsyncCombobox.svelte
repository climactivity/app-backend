<script lang="ts">
    import { Input } from "sveltestrap";

    export let inputId: string;
    export let name: string;
    export let value: string;
    export let optionsPromise: Promise<any[]>;

    optionsPromise.then((data) => data.forEach((d) => console.log(d)));
</script>

<label for={inputId}>{name}</label>
<Input id={inputId} name={inputId} type="select" bind:value>
    <option disabled selected value={null}> -- {name} -- </option>
    {#await optionsPromise}
        <option disabled value={null}>Lade...</option>
    {:then data}
        {#each data as aspect}
            <option value={aspect._id}>{aspect.name}</option>
        {/each}
    {:catch error}
        <option disabled value={null}>An error occurred!</option>
    {/await}
</Input>
