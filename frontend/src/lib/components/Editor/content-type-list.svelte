<script lang="ts">
import { onMount } from "svelte";
import type { Content } from "./editor-types";
import { goto } from '$app/navigation';
import { page } from "$app/stores";
export let ListElementComponent;
export let fetchContentMetaData: (offset: number, limit: number) => Promise<Content[]>; 
export let offset: number, limit: number;
export let searchTarget = "title"

let selectedId
let data;
let selectedData = [];
let searchQuery = "";
const refetch = async () => {
    console.log("fetching list content!");
    data = await fetchContentMetaData(offset, limit); 
}

const selectElement = (event: Event, elem) => {
    event.preventDefault();
    console.log(`selected ${elem.name}`);
    selectedId = elem._id;
    const relativeBase = $page.routeId.split("/")[0];
    goto(`/${relativeBase}/${selectedId}`, {
        replaceState: false
    }).then(() => console.log("navigated")).catch(() => console.log("failed"))

}

const newElement = (event: Event) => {
    event.preventDefault();
    console.log(`new`);
}

const search = (element) => element[searchTarget] as String && element[searchTarget].toLowerCase().includes(searchQuery.toLowerCase());

$: selectedData = searchQuery.length > 3 ? data ? data.filter(search) : [] : data; 

onMount(async () => {
    refetch(); 
})
</script>


<div> 
    <div class="clickable cta my-2 p-2" on:click={newElement}>
        <button>
            + hinzufügen
        </button>    
    </div> 

    <div class="clickable my-2 p-2 flex flex-row" >
        <span>🔎</span>
        <input id="search" placeholder="Suche" bind:value={searchQuery}>   
    </div> 
    {#if data}
        {#each selectedData as elem}
        <div on:click={(e) => selectElement(e,elem)} class="clickable my-2 p-2 bg-slate-50" class:selected="{selectedId === elem._id}">
            <svelte:component this={ListElementComponent} data={elem}/>
        </div>
        {/each}
    {:else}
        Loading...
    {/if}
</div>

<style lang="scss">
.selected {
    @apply bg-white shadow-md transition-all
}

.clickable {
    @apply cursor-pointer select-none rounded-sm
}

</style>