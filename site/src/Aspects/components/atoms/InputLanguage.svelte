<script lang="ts">
    import {InputGroup, InputGroupAddon, InputGroupText, Input} from 'sveltestrap';
    import {LocalizationLanguage} from "../../AspectTypes";

    export let selectedLanguage: LocalizationLanguage;
</script>

<InputGroup>
    <InputGroupAddon addonType="prepend">
        <InputGroupText>Language</InputGroupText>
    </InputGroupAddon>
    <Input type="select" name="select" id="exampleSelect" bind:value={selectedLanguage}>
        <option>{LocalizationLanguage.DE}</option>
        <option>{LocalizationLanguage.EN}</option>
    </Input>
</InputGroup>