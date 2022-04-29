<script lang="ts">
    import {Alert, ListGroup, ListGroupItem, Button, Col, Row} from 'sveltestrap';
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
    <div xs="auto">
        <h4 class="mt-3">All Aspects</h4>
    </div>

    <div xs="auto">
        <button divor="success" on:click={() => addAspect()}>Add</button>
    </div>
</div>

{#if aspects.length === 0}
    <Alert divor="warning" fade={false}>No aspects exist yet.</Alert>
{:else}
    <ul>
        {#each aspects as aspect}
            <li tag="button" action
                           active={aspect === selectedAspect}
                           on:click={(event) => handleAspectSelected(event, aspect)}>
                {aspect.name}
            </li>
        {/each}
        </ul>
{/if}

