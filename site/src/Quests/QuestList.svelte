<script lang="ts">
import { baseUrl } from "../stores";
import { QuestDto } from "./QuestTypes";
import { Card } from 'sveltestrap' 

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



</script>

{#await questPromise}
    Lade ... 
{:then quests} 
    {#each quests as quest}
    <div class={quest == selectedQuest ? "quest-card active" : "quest-card"} on:click={ () => {
        console.log(quest)
        if(questSelectedCallback) {

            questSelectedCallback(quest)
            selectedQuest = quest
        }
    }}>
        {quest._id} - {quest.title}
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