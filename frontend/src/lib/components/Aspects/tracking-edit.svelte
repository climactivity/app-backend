<script lang="ts">
import StringEdit from "../Editor/string-edit.svelte";

import type { LocalizedTrackingData } from "./AspectTypes";
export let value: LocalizedTrackingData


import FactorListItem from "./factor-list-item.svelte";
import ReorderableList from "../ReorderableList.svelte";
import TrackingOptionItem from "./tracking-option-item.svelte";

console.log(value)
const addTrackingOption = (event) => {
};

</script>


<StringEdit bind:value={value.question} id="question" placeholder="Frage" class="w-full" label="Frage"/>

<ReorderableList
    listItem={TrackingOptionItem}
    bind:value={value.options}
    indexField="level"
    headers={["Stufe", "Option", "Wachstumsfaktor", "Eingespartes CO_2", "Reward XP", "Reward Coins",]}
    listCols="1fr 7fr 1fr 1fr 1fr 1fr 1fr 1fr"
/>
<div class="grid col-span-4 place-content-end">
    <button class="button cta w-20 m-2 " on:click={addTrackingOption}>+</button>
</div>
