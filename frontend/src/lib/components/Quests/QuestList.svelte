<script lang="ts">
  import { baseUrl } from "$lib/stores/stores";
  import { QuestDto } from "./QuestTypes";
  import { faToiletPaper } from "@fortawesome/free-solid-svg-icons";
import { text } from "svelte/internal";

  export const refetch = () => {
    console.log("refreshing quest list");
    fetchQuests();
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
      },
    );

    return await response.json();
  };

  let questPromise: Promise<any[]> = fetchQuests();

  let term: string = "";

	let questOpen: any = false;
  const toggleModal = () => {
    questOpen = !questOpen;
  };
</script>

<div class="">
  <input
    class="rounded-lg border-transparent flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent my-2 "
    placeholder="Aufgaben suchen.."
    bind:value={term}
  />
</div>

{#await questPromise}
  Lade ...
{:then quests}
  {#each quests
    .sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
    .filter((aufgabe) => aufgabe.title
        .toLowerCase()
        .match(term.toLowerCase())) as quest}
    <div
      class="block py-1 px-2 mb-2 border-b border-gray-300"
      
    >
      <h3 class="inline-block font-medium text-gray-700 dark:text-gray-100 hover:underline">
        {quest.title}
      </h3>
			<button
				class=" z-10 inline-block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white  focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
				on:click={() => {
        console.log(quest);
				toggleModal();
      }}
			 >
				<svg
					class="w-5 h-5 text-gray-800 dark:text-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
      <p class=" text-sm text-gray-500 dark:text-gray-400 ">
        Created Date: {quest.createdAt.slice(0, 10)}, Last Modified: {quest.updatedAt.slice(
          0,
          10,
        )}, Author: Admin
      </p>
			<div class="{questOpen ? 'block':'hidden'}">
				<div>
					<p>{quest.text.doc.content[0].content[0].text}</p> 
				</div><a href="quests/{quest._id} " class="hover:bg-slate-200 hover:underline ">Edit</a>
			</div>
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
