<script lang="ts">
    import {Alert, ListGroup, ListGroupItem, Button, Col, Row} from 'sveltestrap';
    import type Aspect from "./AspectTypes";

    export let aspects: Aspect[];
</script>

<h4 class="mt-3">All Aspects</h4>

{#if aspects.length === 0}
    <Alert color="warning" fade={false}>No aspects exist yet.</Alert>
{:else}
    <ListGroup>
        {#each aspects as aspect}
            <ListGroupItem active tag="button" action>{aspect.name}</ListGroupItem>
        {/each}
    </ListGroup>
{/if}

<Row>
    <Col xs={{ size:6, offset: 3 }}>
        <Button>New aspect</Button>
    </Col>
</Row>