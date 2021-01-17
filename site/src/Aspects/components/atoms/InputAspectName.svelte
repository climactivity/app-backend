<script lang="ts">
    import {InputGroup, InputGroupAddon, InputGroupText, Input} from 'sveltestrap';

    export let name: string;
</script>
<InputGroup>
    <InputGroupAddon addonType="prepend">
        <InputGroupText>Name</InputGroupText>
    </InputGroupAddon>
    <Input placeholder="Aspect Name" bind:value={name}/>
</InputGroup>
