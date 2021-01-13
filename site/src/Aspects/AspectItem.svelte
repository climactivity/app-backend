<script lang="ts">
    import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table} from 'sveltestrap';
    import type {Aspect} from "./AspectTypes";
    import {LocalizationLanguage} from "./AspectTypes";
    import {createEventDispatcher} from 'svelte';

    export let aspect: Aspect;

    let selectedLanguage : LocalizationLanguage = LocalizationLanguage.DE;
    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch("deleteAspect", {
            aspect: aspect
        });
        aspect = null;
    }

    function handleLanguageSelect() {

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
                <Input placeholder="Aspect Name" value={aspect?.localizedData.get(selectedLanguage).title}/>
            </InputGroup>
        </Col>
        <Col>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Language</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="select" id="exampleSelect" bind:value={selectedLanguage} on:select={handleLanguageSelect}>
                        <option>{LocalizationLanguage.DE}</option>
                        <option>{LocalizationLanguage.EN}</option>
                </Input>
            </InputGroup>
        </Col>
    </Row>
    <Row>
        <h5 class="mt-3">Question</h5>
        <InputGroup>
            <Input type="textarea" placeholder="How much meat do you eat?" value={aspect?.localizedData.get(selectedLanguage)?.question}/>
        </InputGroup>
    </Row>

    <Row>
        <h5 class="mt-3">Tracking options</h5>
        <Container>
            <Table bordered>
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
                {#each aspect?.trackingRewards || [] as reward}
                    <tr>
                        <th scope="row">{reward.id}</th>
                        <td><Input row="1" type="textarea" value={aspect?.localizedData.get(selectedLanguage).rewardAnswers.get(reward.id)}/></td>
                        <td><Input type="number" step="10" min="0" value={reward.xp}/></td>
                        <td><Input type="number" step="5" min="0" value={reward.coins}/></td>
                        <td><Input type="number" min="0" value={reward.water}/></td>
                    </tr>
                {/each}
                </tbody>
            </Table>
        </Container>
    </Row>
</div>