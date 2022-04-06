<script lang="ts">
import { baseUrl } from "../stores";
import { QuestDto } from "./QuestTypes";
import { Card } from 'sveltestrap' 
import { onMount } from "svelte";

    export const refetch = () => {
        console.log("refreshing quest list");
        fetchQuests()
    };

    export let questModifiedCallback;
    export let questSelectedCallback;
    export let selectedQuest;
    const fetchQuests = async () => {
        const response = await fetch(
            `${baseUrl}quest-management?${new URLSearchParams({
                r: "DE",
                l: "DE",
            })}`,
            {
                credentials: "include",
            }
        );

        return await response.json();
    };

    let questPromise: Promise<any[]> = fetchQuests(); 
    
    // let newData
    // onMount(async ()=>{
    //      newData = await questPromise;
    //      newData.sort((a, b) => {
    //         if (a.title < b.title) {
    //             return -1;
    //         }
    //         if (a.title > b.title) {
    //             return 1;
    //         }
    //         return 0;
    //     });
    //     console.log(newData)
    // })

</script>

{#await questPromise}
    Lade ... 
{:then quests} 
    {#each quests.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }) as quest}
    <div class={quest == selectedQuest ? "quest-card active" : "quest-card"} on:click={ () => {
        console.log(quest)
        if(questSelectedCallback) {

            questSelectedCallback(quest)
            selectedQuest = quest
        }
    }}>
        {quest.title} - {quest.alertTrackedAspect}
</div>
    {/each}
{/await}

<style>
    .active {
        background-color: lightgreen;
    }
    .quest-card {
        border: solid;
        border-radius: 4px;
        border-width: 1px;
        border-color: darkgray;
        padding: 10px; 
        margin: 5px;
    }
</style>