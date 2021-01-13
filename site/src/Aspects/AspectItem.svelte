<script lang="ts">
    import {
        Row,
        Col,
        Button,
        InputGroup,
        InputGroupAddon,
        InputGroupText,
        Input,
        Table,
        Container
    } from 'sveltestrap';
    import type {Aspect} from "./AspectTypes";
    import {createEventDispatcher} from 'svelte';

    export let aspect: Aspect;

    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch("deleteAspect", {
            aspect: aspect
        });
        aspect = null;
    }

</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">Current Aspect</h4>
    </Col>

    <Col xs="auto">
        <Button color="danger" on:click={handleDelete}>Remove</Button>
    </Col>
</Row>


<div>
    <Row>
        <Col>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Aspect Name" value={aspect?.name}/>
            </InputGroup>
        </Col>
        <Col>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input disabled placeholder="icon"/>
            </InputGroup>
        </Col>
    </Row>
    <Row>
        <h5 class="mt-3">Question</h5>
        <InputGroup>
            <Input type="textarea" placeholder="How much meat do you eat?" value={aspect?.question}/>
        </InputGroup>
    </Row>

    <Row>
        <h5 class="mt-3">Tracking options</h5>
        <Container>
            <Table bordered >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Answer</th>
                    <th>XP</th>
                    <th>Coins</th>
                    <th>Water</th>
                </tr>
                </thead>
                <tbody>
                {#each aspect?.trackingOptions  || [] as trackingOption}
                    <tr>
                        <th scope="row">{trackingOption.id}</th>
                        <td><Input type="textarea" value={trackingOption.answer}/></td>
                        <td><Input type="number" value={trackingOption.xp}/></td>
                        <td><Input type="number" value={trackingOption.coins}/></td>
                        <td><Input type="number" value={trackingOption.water}/></td>
                    </tr>
                {/each}
                </tbody>
            </Table>
        </Container>
    </Row>
</div>