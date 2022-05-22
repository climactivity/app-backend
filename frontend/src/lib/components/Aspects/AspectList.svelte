<script lang="ts">
    import type Aspect from "./AspectTypes";
    import {createEventDispatcher} from 'svelte';

    export let selectedAspect: Aspect;
    export let aspects: Aspect[];

    const dispatch = createEventDispatcher();

    function handleAspectSelected(event, aspect) {
        selectedAspect = selectedAspect === aspect ? null : aspect;
        console.log(selectedAspect);
        dispatch("message")
    }

    let addCounter = 1;

    function addAspect() {
        const newAspect = {
            name: "New Aspect " + addCounter,
            localizedTrackingData: {},
            question: "",
            forLanguage: "DE",
            forRegion: "DE"

        }
        aspects = [...aspects, newAspect];
        selectedAspect = newAspect;
        addCounter++;
    }


</script>

<div>
    <div >
        <h4 class="mt-3">All Aspects</h4>
    </div>

    <div  >
        <button   on:click={() => addAspect()}>Add</button>
    </div>
</div>

{#if aspects.length === 0}
    <alert divor="warning" fade={false}>No aspects exist yet.</alert>
{:else}
    <ul>
        {#each aspects as aspect}
            <li   
                           active={aspect === selectedAspect}
                           on:click={(event) => handleAspectSelected(event, aspect)}>
                {aspect.name}
            </li>
        {/each}
        </ul>
{/if}

