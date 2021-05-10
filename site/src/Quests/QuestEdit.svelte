<script lang="ts">
    import { onMount } from "svelte";

    import { Label, Button, Col, Input, Card, CardBody, CardHeader, CardFooter } from "sveltestrap";
    import AspectAsyncCombobox from "../Infobytes/atoms/AspectAsyncCombobox.svelte";
    import { baseUrl } from "../stores";
    import { QuestDto } from "./QuestTypes";
    import RichtTextEditor from "../RichtTextEditor.svelte";
import ImagePicker from "../ImageUpload/ImagePicker.svelte";
    export let questModifiedCallback;

    export let quest: QuestDto;
    let iconImg
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

    const refetchAspects = async () => {
        aspectsPromise = fetchAspects();
    };

    $: if (quest.language && quest.region) {
        refetchAspects();
    }
    const save = async () => {
        let doc = quest; 
        doc.text = quest.text?.doc;
        doc.altIcon = iconImg.relativeUrl
        console.log(JSON.stringify(doc));
        const response = await fetch(
            `${baseUrl}quest-management?${quest._id ? "/" + quest._id : ""}`,
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

        return await response.json();
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
        <ImagePicker bind:img={iconImg}/>

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
    </CardFooter>
</Card>