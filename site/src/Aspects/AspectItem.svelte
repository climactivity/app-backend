<script lang="ts">
    import {
        Row,
        Col,
        Button,
        InputGroup,
        InputGroupAddon,
        InputGroupText,
        Input,
        ListGroup,
        ListGroupItem,
        Container,
        Label,
        Card, Form, ButtonGroup
    } from "sveltestrap";
    import type Aspect from "./AspectTypes";
    import { createEventDispatcher } from "svelte";
    import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import App from "../App.svelte";
    import {postAspect} from "./AspectData"
import { isProd } from "../stores";
    export let aspect: Aspect;
    let newFactor = "";
    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch("deleteAspect", {
            aspect: aspect,
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

{#if aspect != null}
    <Form id="form">
        <Row>
            <Col>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        placeholder="Name des Aspektes"
                        bind:value={aspect.name}
                    />
                </InputGroup>
            </Col>
            <Col>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="icon" />
                </InputGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <h5 class="mt-3">Description</h5>
                <Card body>
                    <Label for="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Titel in der App"
                        bind:value={aspect.title}
                    />

                    <Label for="sector">Sektor</Label>
                    <Input
                        placeholder="sector"
                        bind:value={aspect.bigpoint}
                        type="select"
                    >
                        <option value={null}> -- Sektor auswählen--</option>
                        <option value={"ernaehrung"}>Zelt der Ernährung</option>
                        <option value={"energy"}>Zelt der Energie</option>
                        <option value={"mobility"}>Zelt der Mobilität</option>
                        <option value={"indirect_emissions"}
                            >Zelt der Emissionen</option
                        >
                        <option value={"private_engagement"}
                            >Zelt des privaten Engagements</option
                        >
                        <option value={"public_engagement"}
                            >Zelt des öffentlichen Engagements</option
                        >
                    </Input>

                    <label for="region">Region</label>
                    <Input
                        id="region"
                        name="region"
                        type="select"
                        bind:value={aspect.forRegion}
                    >
                        <option value={null} > -- Region -- </option>
                        <option>DE</option>
                    </Input>

                    <label for="language">Sprache</label>
                    <Input
                        id="language"
                        name="language"
                        type="select"
                        bind:value={aspect.forLanguage}
                    >
                        <option value={null} > -- Sprache -- </option>

                        <option>DE</option>
                        <option>EN</option>
                    </Input>
                    <Label>Gesichtspunkte</Label>
                    {#each aspect.localizedFactors == null ? [] : aspect.localizedFactors as factor}
                        <Label>{factor.id}: {factor.name}</Label>
                    {/each}
                    <Label>Gesichtspunkt hinzufügen</Label>
                    <InputGroup>
                        <Input id="gesichtspunkt"type="text" placeholder="Gesichtspunkt" bind:value={newFactor} />
                        <Button disabled={newFactor === ""} on:click={(e) => {
                            e.preventDefault()
                            if (aspect.localizedFactors == null) {
                                aspect.localizedFactors = []
                            }
                            let addedFactor = {
                                id: aspect.localizedFactors.length,
                                name: newFactor
                            }
                            aspect.localizedFactors = [...aspect.localizedFactors, addedFactor]
                            newFactor = ""
                        }}>+</Button>
                    </InputGroup>
                    <Label for="message">Einleitungstext</Label>
                    <Input id="message" type="textarea" placeholder="description" bind:value={aspect.message} />
                </Card>
            </Col>
        </Row>

        <Row>
            <h5 class="mt-3">Quiz elements</h5>
            <Container>
                <ListGroup>
                    <ListGroupItem action>Active</ListGroupItem>
                    <ListGroupItem action>Bravo</ListGroupItem>
                    <ListGroupItem action>Charlie</ListGroupItem>
                    <ListGroupItem action>Delta</ListGroupItem>
                </ListGroup>
            </Container>
        </Row>

        <Row>
            <ButtonGroup>
                <Button type="submit" form="form" on:click={(e) => {
                    e.preventDefault(); 
                    postAspect(aspect).then((res) => {
                        aspect = res
                        alert("Success " + aspect._id)
                    })
                }}>Speichern</Button>
            </ButtonGroup>
        </Row>

        </Form>
{:else}
    <Card body>
        <h1>neuen Aspekt erstellen?</h1>
    </Card>
{/if}

{#if isProd}
<div>
    <span>Debug</span>
    <pre>{JSON.stringify(aspect, null, 2)}</pre>
  </div>
{/if}

