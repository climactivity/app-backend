<script lang="ts">
import AspectListCard from "../Aspects/aspect-list-card.svelte";
import type { Content, FieldExtractor, FieldSetExtractor } from "./editor-types";
export let data: Content;
export let extractor: FieldSetExtractor;
const extractFields = (data, extractor) => {
    return Object.keys(extractor).map(fieldName => {
        try {
            const fieldDataRef = data[fieldName];
            const fieldExtractor: FieldExtractor = extractor[fieldName];
            return {fieldName, component: fieldExtractor.component, extractor: fieldExtractor};
        } catch (e) {
            console.log(e)
        }
    })
}
let fields = extractFields(data, extractor);
</script>

<content class="grid grid-flow-row justify-start">
    <nav class="grid grid-flow-col">
        <h1>Content Editor</h1>
        <button>Speichern</button>
    </nav>

    {#if fields}
    {#each fields as field}
        <svelte:component this={field.component} bind:value={data[field.fieldName]} {...field.extractor}/>
    {/each}
    {/if}



</content>

