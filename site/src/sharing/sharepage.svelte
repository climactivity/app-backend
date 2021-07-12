<script lang="ts">
import InfobitDisplay from "./InfobitDisplay.svelte";

    export let infobyte;
    export let index;
    const url = `${window.location.origin}/sharing/${infobyte}/${index}`
    const infobyteContent = fetch(url,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(response => response.json());
</script>

<main>

{#await infobyteContent}
    fatching... 
{:then data}
    {#if data.statusCode == 400}
        <span>{data.message}</span>
    {:else}
        <h1>{data.title}</h1>

        <InfobitDisplay infobit={data}/>
    {/if}

{:catch errors}
<span>{errors.message}</span>
{/await}
</main>