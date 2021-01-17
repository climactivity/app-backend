<script lang="ts">
    import {Input, InputGroup} from 'sveltestrap';

    export let question: string;
</script>
<h5 class="mt-3">Question</h5>
<InputGroup>
    <Input type="textarea" placeholder="How much meat do you eat?"
           bind:value={question}/>
</InputGroup>
