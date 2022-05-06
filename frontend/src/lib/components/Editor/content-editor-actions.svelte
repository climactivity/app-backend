<script lang="ts">
import { goto } from "$app/navigation";

    import type { Content } from "./editor-types";

    export let data: Content;
    export let title = ""
    const goBack = (event) => {
        history.back()
    }
</script>

<div  {...$$props}>
    <div class="pb-8 mx-auto w-full flex flex-row justify-center">

<div class="bg-white rounded-b-md shadow-md fixed ">
    <nav class="grid grid-cols-3  ">
        <div class="flex flex-row col-span-1 items-stretch">
            <button class="text-lg my-auto  p-2" on:click|preventDefault={goBack}>🡄</button>
            <span class="text-lg my-auto">{title}</span>    
        </div>
        <div class="flex flex-row col-span-1 col-start-3 place-content-end mr-4">
            <label class="text-lg my-auto">Veröffentlichen <input type="checkbox" bind:checked={data.published}/></label>
            <button class="button cta ml-2 my-auto">Speichern</button>
        </div>
    </nav>
</div>
</div>
</div>
