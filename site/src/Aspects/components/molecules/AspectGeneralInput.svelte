<script lang="ts">
    import {Col} from 'sveltestrap';
    import InputAspectName from "../atoms/InputAspectName.svelte";
    import InputLanguage from "../atoms/InputLanguage.svelte";
    import InputAspectQuestion from "../atoms/InputAspectQuestion.svelte";

    export let name, selectedLanguage, question;
</script>

<Col>
    <InputAspectName {name}/>
</Col>
<Col>
    <InputLanguage bind:selectedLanguage={selectedLanguage}/>
</Col>
<InputAspectQuestion {question}/>
