<script lang="ts">
    import {Alert, ListGroup, ListGroupItem, Button, Col, Row} from 'sveltestrap';
    import type {Aspect} from "./AspectTypes";
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

    <!--function addAspect() {-->
    <!--    const newAspect = {-->
    <!--        name: "New Aspect " + addCounter,-->
    <!--        trackingOptions: [],-->
    <!--        question: ""-->
    <!--    }-->
    <!--    aspects = [...aspects, newAspect];-->
    <!--    selectedAspect = newAspect;-->
    <!--    addCounter++;-->
    // }


</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">All Aspects</h4>
    </Col>

    <Col xs="auto">
<!--        <Button color="success" on:click={() => addAspect()}>Add</Button>-->
    </Col>
</Row>

{#if aspects.length === 0}
    <Alert color="warning" fade={false}>No aspects exist yet.</Alert>
{:else}
    <ListGroup>
        {#each aspects as aspect}
            <ListGroupItem tag="button" action
                           active={aspect === selectedAspect}
                           on:click={(event) => handleAspectSelected(event, aspect)}>
                {aspect.name}
            </ListGroupItem>
        {/each}
    </ListGroup>
{/if}

