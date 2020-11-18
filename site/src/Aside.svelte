<script lang="ts">
	const infobytes: Promise<[{name: string, _id: string}]> = (async () => {
		const response = await fetch('/infobyte')
    return await response.json()
    })();
    function onInfobyteSelected(infobyte: {name: string, _id: string}) {
        console.log("selected ", infobyte);
    }
</script>

<style>
    aside {
        float: left;
    }

    @media (min-width: 640px) {
    aside {
        width: 20vw;
    }
  }
</style>

<aside>
    {#await infobytes}
        <p>...waiting</p>
    {:then data}
    <ul>
        {#each data as infobyte}
            <li on:click={() => onInfobyteSelected(infobyte)} >{infobyte.name}</li>
        {/each}
    </ul> 
    {:catch error}
        <p>An error occurred!</p>
    {/await}


    <button>
        Add new
    </button>
</aside>