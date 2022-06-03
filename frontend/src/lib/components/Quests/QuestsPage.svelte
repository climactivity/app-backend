<script lang="ts">
  import QuestList from "./QuestList.svelte";
  import QuestEdit from "./QuestEdit.svelte";
  import { QuestDto } from "./QuestTypes";

  import { currentInfobit, currentQuestion } from "$lib/stores/stores";
import NewQuest from "./NewQuest.svelte";

  let modalOpen: any = false;
  const toggleModal = () => {
    modalOpen = !modalOpen;
  };

  let questList = null;
  let currentQuest = new QuestDto();
  const questModifiedCallback = () => {
    flashToast(2500);
    if (questList) {
      questList.refetch();
    }
  };

  const questSelected = (quest) => {
    currentQuest = { ...currentQuest, ...quest };
    if (currentQuest) {
      modalOpen = true;
    }
  };

  let showToast = false;

  const flashToast = (duration) => {
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, duration);
  };
</script>

<div
  class="{showToast
    ? 'p-3 mb-3 absolute'
    : 'hidden absolute'}flex w-full max-w-sm mx-auto overflow-hidden bg-slate-100 rounded-lg shadow-md dark:bg-gray-800"
>
  <div class="flex items-center justify-center w-12 bg-emerald-500">
    <svg
      class="w-6 h-6 text-white fill-current"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
      />
    </svg>
  </div>

  <div class="px-4 py-2 -mx-3">
    <div class="mx-3">
      <span class="font-semibold text-emerald-500 dark:text-emerald-400"
        >Success</span
      >
      <p class="text-sm text-gray-600 dark:text-gray-200">
        Aufgabe hochgeladen!
      </p>
    </div>
  </div>
</div>

<div>
  <div>
    <button
      class="py-2 px-4  bg-gradient-to-l from-green-400 to-blue-500 text-white w-full transition ease-in duration-400 text-center text-base font-semibold shadow-xl rounded   hover:to-blue-700"
      on:click={toggleModal}
      style="width: 100%"
    >
      Aufgabe erstellen
    </button>
		
    {#if modalOpen}
      <div>
        <!-- <QuestEdit {questModifiedCallback} quest={currentQuest} /> -->
        <NewQuest />
      </div>
    {/if}

    <QuestList
      bind:this={questList}
      {questModifiedCallback}
      questSelectedCallback={questSelected}
    />
  </div>
</div>
