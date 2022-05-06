<script lang="ts">
import StringEdit from "../Editor/string-edit.svelte";

import type { LocalizedTrackingData, LocalizedTrackingOption } from "./AspectTypes";
export let value: LocalizedTrackingData


import FactorListItem from "./factor-list-item.svelte";
import ReorderableList from "../ReorderableList.svelte";
import TrackingOptionItem from "./tracking-option-item.svelte";

console.log(value)
const addTrackingOption = (event) => {
    let options: LocalizedTrackingOption[] = [...value.options, {
        level: value.options.length,
        option: "",
        waterFactor: 0,
        co2value: 0,
        reward: {
            coins: 0,
            water: 0,
            xp: 0,
        }
    }];
    value = {...value, options};
};

</script>


<StringEdit bind:value={value.question} id="question" placeholder="Frage" class="w-full" label="Frage"/>
<StringEdit bind:value={value.footnote} id="footnote" placeholder="Fußnoten" class="w-full" label="Fußnoten" type="textarea"/>

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
