<script lang="ts">
    import type { Content } from "./editor-types";

    export let data: Content;
</script>

<div>
    <nav class="grid grid-flow-col">
        <h1>Content Editor</h1>
        <label> Veröffentlichen <input type="checkbox" bind:checked={data.published}/></label>
        <button>Speichern</button>
    </nav>
</div>
