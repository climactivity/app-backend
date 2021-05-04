<script lang="ts">
    import { onMount } from "svelte";

    import { Button, Col, Input } from "sveltestrap";
    import AspectAsyncCombobox from "../Infobytes/atoms/AspectAsyncCombobox.svelte";
import { fetchAspects } from "../Infobytes/InfobyteService";
    import { QuestDto, QuestLocalization } from "./QuestTypes";
    export let questModifiedCallback;

    export let quest: QuestDto;

    let aspectsPromise: Promise<any[]> = fetchAspects(quest.region, quest.questLocalization[0]?.language);

    const save = () => {};
    const addLocale = () => {
        quest.questLocalization = [...quest.questLocalization, (new QuestLocalization())]
        console.log(quest)
    }
</script>

<div class="wrapper">
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
            bind:value={quest.startDate}
        />

        <label for="maxDurationInput"> maximale Dauer (in Stunden) </label>
        <input
            required
            id="maxDurationInput"
            name="maxDurationInput"
            type="number"
            bind:value={quest.startDate}
        />
    </div>

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

        {#each quest.questLocalization as locale, index}
            <div class="localization">
                <label for="language">Sprache</label>
                <Input
                    id="language"
                    name="language"
                    type="select"
                    bind:value={locale.language}
                >
                    <option value={null}> -- Sprache -- </option>
                    <option>DE</option>
                </Input>
                
                <label for="locale-${index}-title"> Titel </label>
                <input
                    required
                    id="locale-${index}-title"
                    name="locale-${index}-title"
                    type="string"
                    bind:value={locale.title}
                />

                <label for="locale-${index}-text"> text </label>
                <textarea
                    required
                    id="locale-${index}-text"
                    name="locale-${index}-text"
                    type="text"
                    bind:value={locale.text}
                />    
            </div>
        {/each}
        <button on:click={addLocale}>+</button>
    </div>

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


    


    <Col xs="6">
        <Button on:click={save}>Speichern</Button>
    </Col>
</div>
