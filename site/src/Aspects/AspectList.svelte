<script lang="ts">
    import {Alert, ListGroup, ListGroupItem, Button, Col, Row} from 'sveltestrap';
    import type Aspect from "./AspectTypes";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function handleAspectSelected(event, aspect) {
        selectedAspect = selectedAspect === aspect ? null : aspect;
        console.log(selectedAspect);
        dispatch("message")
    }

    function addAspect() {
        aspects = [...aspects, {
            name: "New Aspect",
            trackingOptions: [],
            question: ""
        }]
        console.log(aspects);
    }

    export let selectedAspect: Aspect;
    export let aspects: Aspect[];
</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">All Aspects</h4>
    </Col>

    <Col xs="auto">
        <Button color="success" on:click={() => addAspect()}>+</Button>
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

