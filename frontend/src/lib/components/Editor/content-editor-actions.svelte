<script lang="ts">
import { goto } from "$app/navigation";

    import type { Content } from "./editor-types";

    export let data: Content;

    const goBack = (event) => {
        history.back()
    }
</script>

<div class="bg-gradient-to-br  from-indigo-400 to-indigo-300 w-full">
    <nav class="grid grid-flow-col place-content-between fixed">
        <div class="flex flex-row">
            <button on:click|preventDefault={goBack}>🔙</button>
            <h1>Content Editor</h1>    
        </div>
        <div class="flex flex-row">
            <label>Veröffentlichen <input type="checkbox" bind:checked={data.published}/></label>
            <button>Speichern</button>
        </div>
    </nav>
</div>
