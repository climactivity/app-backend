<script lang="ts">
    import { onMount } from "svelte";

    import {
        Label,
        Button,
        Col,
        Input,
        Card,
        CardBody,
        CardHeader,
        CardFooter,
    } from "sveltestrap";
    import AspectAsyncCombobox from "../Infobytes/atoms/AspectAsyncCombobox.svelte";
    import { baseUrl } from "../stores";
    import {
        FilterType,
        QuestAspectFilter,
        QuestDto,
        QuestQuestFilter,
    } from "./QuestTypes";
    import RichtTextEditor from "../RichtTextEditor.svelte";
    import ImagePicker from "../ImageUpload/ImagePicker.svelte";
import RewardForm from "../Rewards/RewardForm.svelte";
    export let questModifiedCallback;

    export let quest: QuestDto;
    let iconImg;
    let newAspectFilter: QuestAspectFilter = new QuestAspectFilter();
    let newQuestFilter: QuestQuestFilter = new QuestQuestFilter();
    const fetchAspects = async () => {
        const response = await fetch(
            `${baseUrl}localized-aspect?${new URLSearchParams({
                r: quest.region,
                l: quest.language,
            })}`,
            {
                credentials: "include",
            }
        );

        return await response.json();
    };
    let aspectsPromise: Promise<any[]> = fetchAspects();

    const fetchQuests = async () => {
        const response = await fetch(
            `${baseUrl}quest-management?${new URLSearchParams({
                r: quest.region,
                l: quest.language,
            })}`,
            {
                credentials: "include",
            }
        );

        return await response.json();
    };

    let questPromise: Promise<any[]> = fetchQuests();
    const refetchAspects = async () => {
        aspectsPromise = fetchAspects();
    };

    $: if (iconImg) {
        quest.altIcon = iconImg.relativeUrl;
    }

    $: if (quest.language && quest.region) {
        refetchAspects();
    }
    const save = async () => {
        let doc = quest;
        doc.text = quest.text?.doc;
        //doc.altIcon = iconImg.relativeUrl
        console.log(JSON.stringify(doc));
        const response = await fetch(
            `${baseUrl}quest-management${quest._id ? "/" + quest._id : ""}`,
            {
                credentials: "include",
                method: quest._id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(doc),
            }
        );

        if (!response.ok) {
            console.log(response);
            alert("It broke");
            return;
        }
        quest = { ...quest, ...(await response.json()) };
        questModifiedCallback();
    };

    const deleteQuest = async () => {
        if (quest._id) {
            const response = await fetch(
                `${baseUrl}quest-management${quest._id ? "/" + quest._id : ""}`,
                {
                    credentials: "include",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (!response.ok) {
                console.log(response);
                alert("It broke");
                return;
            }
        }
        quest = new QuestDto();
        questModifiedCallback()
    };

    const getTrackingLevel = async (aspectId, trackingLevel) => {
        let aspect = (await aspectsPromise).find((a) => a._id == aspectId);
        let option = aspect?.localizedTrackingData?.options?.find(
            (opt) => opt.level >= trackingLevel
        )?.option;
        return option;
    };
</script>

<Card>
    <CardHeader>Aufgabe bearbeiten</CardHeader>
    <CardBody class="wrapper">
        <div id="localization-input">
            <label for="region">Region</label>
            <Input
                id="region"
                name="region"
                type="select"
                bind:value={quest.region}
            >
                <option value={null}> -- Region -- </option>
                <option>DE</option>
            </Input>
            <div class="localization">
                <label for="language">Sprache</label>
                <Input
                    id="language"
                    name="language"
                    type="select"
                    bind:value={quest.language}
                >
                    <option value={null}> -- Sprache -- </option>
                    <option>DE</option>
                </Input>

                <label for="quest-title"> Titel </label>
                <Input
                    required
                    id="quest-title"
                    name="-title"
                    type="text"
                    bind:value={quest.title}
                />

                <RichtTextEditor bind:value={quest.text} />

                <div id="meta-input">
                    <label for="linkToAfterInput"> Link nachdem fertig </label>
                    <input
                        required
                        id="linkToAfterInput"
                        name="linkToAfterInput"
                        type="string"
                        bind:value={quest.linkToAfter}
                    />
                    <AspectAsyncCombobox
                        inputId={"alertTrackedAspectInput"}
                        name={"Aspekt Tracking abfragen?"}
                        bind:value={quest.alertTrackedAspect}
                        optionsPromise={aspectsPromise}
                    />
                </div>
            </div>
        </div>
        <div id="time-input">
            <label for="startDateInput"> Start Date </label>
            <input
                required
                id="startDateInput"
                name="startDateInput"
                type="datetime-local"
                bind:value={quest.startDate}
            />

            <label for="deadlineInput"> Deadline </label>
            <input
                required
                id="deadlineInput"
                name="deadlineInput"
                type="datetime-local"
                bind:value={quest.deadline}
            />

            <label for="maxDurationInput"> maximale Dauer (in Stunden) </label>
            <input
                required
                id="maxDurationInput"
                name="maxDurationInput"
                type="number"
                bind:value={quest.maxDuration}
            />
        </div>
        Alternatives Icon
        <ImagePicker bind:img={iconImg} />

        <Card id="aspect-filters">
            <CardHeader>Aspekt Filter</CardHeader>
            <CardBody>
                {#if quest.questAspectFilter === []}
                    Noch keine Aspektfilter
                {/if}
                {#each quest.questAspectFilter as aspectFilter, i}
                    <div>
                        {aspectFilter.aspectId} -
                        {#await getTrackingLevel(aspectFilter.aspectId, aspectFilter.trackingLevel)}
                            ...
                        {:then option}
                            {option}
                        {/await}
                        - {FilterType[aspectFilter.filterType]}
                        <!--die warnung ist einfach mal falsch, cool https://www.typescriptlang.org/docs/handbook/enums.html -->
                    </div>
                    <button
                        on:click={() => {
                            quest.questAspectFilter = quest.questAspectFilter.filter(
                                (_, j) => j !== i
                            );
                        }}
                    >
                        entfernen
                    </button>
                {/each}
            </CardBody>
            <hr />
            <CardBody>
                <AspectAsyncCombobox
                    inputId={"addAspectFilter"}
                    name={"Aspekt-Kriterium"}
                    bind:value={newAspectFilter.aspectId}
                    optionsPromise={aspectsPromise}
                />

                <Input
                    id="region"
                    name="region"
                    type="select"
                    bind:value={newAspectFilter.filterType}
                >
                    <option value={FilterType.REQURIED}> REQURIED </option>
                    <option value={FilterType.EXCLUDED}> EXCLUDED </option>
                    <option value={FilterType.PREFERED}> PREFERED </option>
                </Input>
                <div>
                    <Input
                        id="trackingLevel"
                        name="trackingLevel"
                        type="range"
                        min="0"
                        max="4"
                        step="1"
                        bind:value={newAspectFilter.trackingLevel}
                    />
                    {#await getTrackingLevel(newAspectFilter.aspectId, newAspectFilter.trackingLevel)}
                        ...
                    {:then option}
                        {option}
                    {/await}
                </div>
            </CardBody>
            <CardFooter>
                <Button
                    on:click={() => {
                        if (
                            newAspectFilter.aspectId !== undefined &&
                            newAspectFilter.trackingLevel !== undefined
                        ) {
                            quest.questAspectFilter = [
                                ...quest.questAspectFilter,
                                newAspectFilter,
                            ];
                            newAspectFilter = new QuestAspectFilter();
                        }
                    }}
                >
                    Aspektfilter hinzufügen
                </Button>
            </CardFooter>
        </Card>

        <Card id="quest-filters">
            <CardHeader>Aufgabenfilter</CardHeader>
            <CardBody>
                {#if quest.questQuestFilter === []}
                    Noch keine Aufgabenfilter
                {/if}
                {#each quest.questQuestFilter as questFilter, i}
                    <div>
                        {questFilter.questId} - - {FilterType[
                            questFilter.filterType
                        ]}
                        <!--die warnung ist einfach mal falsch, cool https://www.typescriptlang.org/docs/handbook/enums.html -->
                    </div>
                    <button
                        on:click={() => {
                            quest.questQuestFilter = quest.questQuestFilter.filter(
                                (_, j) => j !== i
                            );
                        }}
                    >
                        entfernen
                    </button>
                {/each}
            </CardBody>
            <hr />
            <CardBody>
                <AspectAsyncCombobox
                    inputId={"addAspectFilter"}
                    name={"Aufgaben-Kriterium"}
                    bind:value={newQuestFilter.questId}
                    optionsPromise={questPromise}
                />

                <Input
                    id="region"
                    name="region"
                    type="select"
                    bind:value={newQuestFilter.filterType}
                >
                    <option value={FilterType.REQURIED}> REQURIED </option>
                    <option value={FilterType.EXCLUDED}> EXCLUDED </option>
                    <option value={FilterType.PREFERED}> PREFERED </option>
                </Input>
            </CardBody>
            <CardFooter>
                <Button
                    on:click={() => {
                        if (newQuestFilter.questId !== undefined) {
                            quest.questQuestFilter = [
                                ...quest.questQuestFilter,
                                newQuestFilter,
                            ];
                            newQuestFilter = new QuestQuestFilter();
                        }
                    }}
                >
                    Aufgabenfilter hinzufügen
                </Button>
            </CardFooter>
        </Card>

        <RewardForm reward={quest.reward}/>

        <Label for={"userSelectable"} style="padding: 5px;">
            <Input
                class="checkbox"
                type="checkbox"
                name={"userSelectable"}
                bind:checked={quest.userSelectable}
            />
            Kann ausgewählt werden
        </Label>

        <Label for={"published"} style="padding: 5px;">
            <Input
                class="checkbox"
                type="checkbox"
                name={"published"}
                bind:checked={quest.published}
            />
            Veröffentlichen
        </Label>
    </CardBody>
    <CardFooter>
        <Col xs="6">
            <Button
                primary
                on:click={(e) => {
                    save();
                }}>Speichern</Button
            >
        </Col>

        <Col xs="6">
            <Button
                danger
                on:click={(e) => {
                    deleteQuest();
                }}>Löschen</Button
            >
        </Col>
    </CardFooter>
</Card>
