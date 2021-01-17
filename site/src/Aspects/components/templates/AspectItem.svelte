<script lang="ts">
    import {Row} from 'sveltestrap';
    import type {Aspect} from "../../AspectTypes";
    import {LocalizationLanguage} from "../../AspectTypes";
    import AspectItemHeader from "../molecules/AspectItemHeader.svelte";
    import AspectGeneralInput from "../molecules/AspectGeneralInput.svelte";
    import AspectTrackingOptionTable from "../organisms/AspectTrackingOptionTable.svelte";

    export let aspect: Aspect;

    let selectedLanguage: LocalizationLanguage = LocalizationLanguage.DE;

</script>
{#if (aspect) }
    <AspectItemHeader aspect={aspect}/>

    <Row>
        <AspectGeneralInput
                name={aspect?.localizedData?.get(selectedLanguage)?.title}
                bind:selectedLanguage={selectedLanguage}
                question={aspect?.localizedData?.get(selectedLanguage)?.question}
        />
    </Row>

    <Row>
        <AspectTrackingOptionTable {aspect} {selectedLanguage}/>
    </Row>
{/if}