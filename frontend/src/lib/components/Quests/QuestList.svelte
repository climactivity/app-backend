<script lang="ts">
import { baseUrl } from "$lib/stores/stores";
import { QuestDto } from "./QuestTypes";
import { Card, CardTitle } from 'sveltestrap' 
 import {Input } from 'sveltestrap' 
import { faToiletPaper } from "@fortawesome/free-solid-svg-icons";

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

    let term:string = "";
    
    
</script>

<div>
    <input placeholder="Aufgaben suchen.." bind:value={term}/>
</div>
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
    }).filter(aufgabe => aufgabe.title.toLowerCase().match(term.toLowerCase())) as quest}

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