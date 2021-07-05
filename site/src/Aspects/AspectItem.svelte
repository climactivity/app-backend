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
        Card,
        Form,
        ButtonGroup,
        Table,
        Spinner,
    } from "sveltestrap";
    import {
        NotificationDisplay,
        notifier,
    } from "@beyonk/svelte-notifications";
    import { Confirm } from "svelte-confirm";
    import type Aspect from "./AspectTypes";
    import { createEventDispatcher } from "svelte";
    import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";
    import App from "../App.svelte";
    import { postAspect } from "./AspectData";
    import { isProd } from "../stores";
    import RewardDisplayer from "../Rewards/RewardDisplayer.svelte";
    import RewardForm from "../Rewards/RewardForm.svelte";
    import { Reward } from "../Rewards/RewardTypes";
    export let aspect: Aspect;
    let newFactor = {
        name: "",
        intro: "",
    };
    const dispatch = createEventDispatcher();
    let waiting = false;
    function handleDelete() {
        dispatch("deleteAspect", {
            aspect: aspect,
        });
        aspect = null;
    }

    function handleAdd() {
        dispatch("addAspect", {
            aspect: aspect,
        });
    }
    let currentOption = {
        option: "",
        reward: new Reward(),
        level: 0,
        co2value: 0.0,
        waterFactor: 0.0,
    };
</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">Current Aspect</h4>
    </Col>

    <Col xs="auto">
        <Confirm let:confirm={confirmDelete}>
            <Button color="danger" on:click={() => confirmDelete(handleDelete)}
                >Remove</Button
            >
        </Confirm>
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
                            >Zelt des Konsums</option
                        >
                        <option value={"private_engagement"}
                            >Zelt des privaten Engagements</option
                        >
                        <option value={"public_engagement"}
                            >Zelt des öffentlichen Engagements</option
                        >
                    </Input>

                    <Label for="themenmonat">Themenmonat</Label>
                    <Input
                        placeholder="themenmonat"
                        bind:value={aspect.themenmonat}
                        type="select"
                    >
                        <option value={null}> -- Themenmonat auswählen--</option>
                        <option value={"bilanzierung"}>Bilanzierung</option> 
                        <option value={"ernaehrung"}>Ernährung</option> 
                        <option value={"sich_informieren"}>Sich informieren</option> 
                        <option value={"mobilitaet_zu_lande"}>Mobilität zu Lande</option> 
                        <option value={"strom_produzieren_und_sparen"}>Strom produzieren und sparen</option> 
                        <option value={"klimaschutzengagement_als_privatperson"}>Klimaschutzengagement als Privatperson</option> 
                        <option value={"dinge_teilen"}>Dinge Teilen</option> 
                        <option value={"klimaschutz_und_geld"}>Klimaschutz und Geld</option> 
                        <option value={"waerme"}>Wärme</option> 
                        <option value={"klimaschutz_in_schule_und_betrieb"}>Klimaschutz in Schule und Betrieb</option> 
                        <option value={"bewusst_einkaufen"}>Bewusst einkaufen</option> 
                        <option value={"urlaub_und_fliegen"}>Urlaub und Fliegen</option> 
                        <option value={"gemeinsam_fuer_den_klimaschutz"}>Gemeinsam für den Klimaschutz</option> 
                    </Input>
                    
                    <Label for="template-type">Template type</Label>
                    <Input
                        placeholder="template-type"
                        bind:value={aspect.templateType}
                        type="select"
                    >
                        <option value={null}> -- Entitätenart--</option>
                        <option value={"tree"}>Baum</option> 
                        <option value={"bush"}>Busch</option> 
                        <option value={"small"}>Kleinkram</option>

                    </Input>

                    <label for="region">Region</label>
                    <Input
                        id="region"
                        name="region"
                        type="select"
                        bind:value={aspect.forRegion}
                    >
                        <option value={null}> -- Region -- </option>
                        <option>DE</option>
                    </Input>

                    <label for="language">Sprache</label>
                    <Input
                        id="language"
                        name="language"
                        type="select"
                        bind:value={aspect.forLanguage}
                    >
                        <option value={null}> -- Sprache -- </option>

                        <option>DE</option>
                        <option>EN</option>
                    </Input>
                    <Label for="message">Einleitungstext</Label>
                    <Input
                        id="message"
                        type="textarea"
                        placeholder="description"
                        bind:value={aspect.frontmatter}
                    />
                </Card>
                <Col>
                    <h5 class="mt-3">Gesichtspunkte</h5>

                    <Card body>
                        <Label>Gesichtspunkte</Label>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Intro</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each aspect.localizedFactors == null ? [] : aspect.localizedFactors as factor}
                                    <tr>
                                        <th>{factor.id}</th>
                                        <td>
                                            <Input
                                                id="factor_name"
                                                type="text"
                                                placeholder="Factor name"
                                                bind:value={factor.name}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                id="factor_intro"
                                                type="text"
                                                placeholder="Factor intro"
                                                bind:value={factor.intro}
                                            />
                                        </td>
                                        <td>
                                            <div />
                                            <Button
                                                on:click={(e) => {
                                                    e.preventDefault();
                                                    aspect.localizedFactors =
                                                        aspect.localizedFactors.filter(
                                                            (f) =>
                                                                f.id !==
                                                                factor.id
                                                        );
                                                    aspect.localizedFactors =
                                                        aspect.localizedFactors.map(
                                                            (f, i) => {
                                                                f.id = i;
                                                                return f;
                                                            }
                                                        );
                                                }}
                                                >-
                                            </Button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </Table>
                        <Label>Gesichtspunkt hinzufügen</Label>
                        <Card body>
                            <Label for="gesichtspunkt_name">Name</Label>
                            <Input
                                id="gesichtspunkt_name"
                                type="text"
                                placeholder="Name"
                                bind:value={newFactor.name}
                            />
                            <Label for="gesichtspunkt_name">Intro</Label>
                            <Input
                                id="gesichtspunkt_intro"
                                type="text"
                                placeholder="Intro"
                                bind:value={newFactor.intro}
                            />
                            <Button
                                disabled={newFactor.name === "" ||
                                    newFactor.intro === ""}
                                on:click={(e) => {
                                    e.preventDefault();
                                    if (aspect.localizedFactors == null) {
                                        aspect.localizedFactors = [];
                                    }
                                    let addedFactor = {
                                        id: aspect.localizedFactors.length,
                                        name: newFactor.name,
                                        intro: newFactor.intro,
                                    };
                                    aspect.localizedFactors = [
                                        ...aspect.localizedFactors,
                                        addedFactor,
                                    ];
                                    newFactor = {
                                        name: "",
                                        intro: "",
                                    };
                                }}>+</Button
                            >
                        </Card>
                    </Card>
                </Col>
            </Col>
        </Row>

        <Row>
            <Col>
                <h5 class="mt-3">Tracking</h5>
                <Card body>
                    <Label for="title">Tracking Frage</Label>
                    <Input
                        id="title"
                        placeholder="Frage"
                        bind:value={aspect.localizedTrackingData.question}
                    />

                    {#if aspect.localizedTrackingData.options}
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Stufe</th>
                                        <th>Option</th>
                                        <th>wachstumsfaktor</th>
                                        <th>Eingespartes CO<sub>2</sub></th>
                                        <th>Reward XP</th>
                                        <th>Reward Coins</th>
                                        <th>Reward Water</th>
                                        <th>-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each aspect.localizedTrackingData.options as option}
                                        <tr>
                                            <th>{option.level}</th>
                                            <td>
                                                <Input
                                                    id="option"
                                                    placeholder="Option"
                                                    bind:value={option.option}
                                                />
                                            </td>
                                            <td
                                                ><Input
                                                    id="waterFactor"
                                                    placeholder="-1 für N/A"
                                                    number
                                                    bind:value={option.waterFactor}
                                                />
                                            </td>
                                            <td
                                                ><Input
                                                    id="co2value"
                                                    placeholder="-1 für N/A"
                                                    number
                                                    bind:value={option.co2value}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    id="option reward xp"
                                                    placeholder="reward xp"
                                                    number
                                                    bind:value={option.reward
                                                        .xp}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    id="option reward coins"
                                                    placeholder="reward coins"
                                                    number
                                                    bind:value={option.reward
                                                        .coins}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    id="option reward water"
                                                    placeholder="reward water"
                                                    number
                                                    bind:value={option.reward
                                                        .water}
                                                />
                                            </td>
                                            <td
                                                ><Button
                                                    on:click={(e) => {
                                                        e.preventDefault();
                                                        aspect.localizedTrackingData.options =
                                                            aspect.localizedTrackingData.options.filter(
                                                                (o) =>
                                                                    o.level !==
                                                                    option.level
                                                            );
                                                        aspect.localizedTrackingData.options =
                                                            aspect.localizedTrackingData.options.map(
                                                                (o, i) => {
                                                                    o.level = i;
                                                                    return o;
                                                                }
                                                            );
                                                    }}>-</Button
                                                ></td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </Table>
                        </div>
                        <Card body>
                            <h5 class="mt-3">Neue Option hinzufügen</h5>

                            <Label for="option">Option</Label>
                            <Input
                                id="option"
                                placeholder="Option"
                                bind:value={currentOption.option}
                            />
                            <Label for="waterFactor">waterFactor</Label>
                            <Input
                                id="waterFactor"
                                placeholder="-1 für N/A"
                                number
                                bind:value={currentOption.waterFactor}
                            />
                            <Label for="co2value">co2value</Label>
                            <Input
                                id="co2value"
                                placeholder="-1 für N/A"
                                number
                                bind:value={currentOption.co2value}
                            />
                            <RewardForm reward={currentOption.reward} />
                            <Button
                                on:click={(e) => {
                                    e.preventDefault();
                                    currentOption.level =
                                        aspect.localizedTrackingData.options.length;
                                    aspect.localizedTrackingData.options = [
                                        ...aspect.localizedTrackingData.options,
                                        currentOption,
                                    ];
                                    currentOption = {
                                        option: "",
                                        reward: new Reward(),
                                        level: 0,
                                        co2value: 0.0,
                                        waterFactor: 0.0,
                                    };
                                }}
                            >
                                Option hinzufügen
                            </Button>
                        </Card>
                    {:else}
                        <Input
                            id="language"
                            name="language"
                            type="select"
                            on:change={(e) => {
                                console.log(e);
                                e.preventDefault();
                                aspect.localizedTrackingData = {
                                    question: "",
                                    options: [],
                                };
                            }}
                        >
                            <option value={null} default>
                                -- Tracking Type --
                            </option>

                            <option value={"steps"}>Steps</option>
                            <option value={"Continuum"} disabled
                                >Continuum</option
                            >
                        </Input>
                    {/if}
                </Card>
            </Col>
        </Row>

        <Row>
            <h5 class="mt-3">Quiz Elements</h5>
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
            <Label for={"published"} style="padding: 5px;">
                <Input
                    class="checkbox"
                    type="checkbox"
                    name={"published"}
                    bind:checked={aspect.published}
                />
                Veröffentlichen
            </Label>
            <ButtonGroup>
                <Button
                    type="submit"
                    form="form"
                    on:click={(e) => {
                        e.preventDefault();
                        waiting = true;
                        postAspect(aspect).then((res) => {
                            handleAdd();
                            // notifier.success("Änderungen gespeichert!", 2000)
                            waiting = false;
                        });
                    }}
                    >{#if waiting}
                        <Spinner info type="grow" />
                    {:else}
                        Speichern
                    {/if}
                </Button>
            </ButtonGroup>
        </Row>
    </Form>
{:else}
    <Card body>
        <h1>neuen Aspekt erstellen?</h1>
    </Card>
{/if}

{#if !isProd}
    <div>
        <span>Debug</span>
        <pre>{JSON.stringify(aspect, null, 2)}</pre>
    </div>
{/if}
