<script lang="ts">
    import InfobyteCombobox from "../atoms/InfobyteCombobox.svelte";
    import InfobyteInput from "../atoms/InfobyteInput.svelte";
    import InfobyteAsyncCombobox from "../atoms/InfobyteAsyncCombobox.svelte";
    import InfobyteValueCombobox from "../atoms/InfobyteValueCombobox.svelte";

    export let region: string;
    export let language: string;
    export let name: string;
    export let frontmatter: string;
    export let aspect: string;
    export let factor: string;
    export let difficulty: string;

    export let aspectsPromise: Promise<[string, number?][]>;
    export let factorsPromise: Promise<[string, number?][]>;
</script>

<h1>Infobyte hinzufügen</h1>

<InfobyteCombobox
    inputId={"region"}
    name={"Region"}
    bind:value={region}
    options={["DE"]}
/>

<InfobyteCombobox
    inputId={"language"}
    name={"Sprache"}
    bind:value={language}
    options={["DE", "EN"]}
/>

<InfobyteInput inputId={"name"} name={"Name"} bind:value={name} />
<InfobyteInput
    inputId={"frontmatter"}
    name={"Klappentext"}
    bind:value={frontmatter}
/>

<InfobyteAsyncCombobox
    inputId={"aspect"}
    name={"Aspekt"}
    bind:value={aspect}
    optionsPromise={aspectsPromise}
/>

<InfobyteAsyncCombobox
    inputId={"factor"}
    name={"Gesichtspunkt"}
    bind:value={factor}
    optionsPromise={factorsPromise}
/>

<InfobyteValueCombobox
    inputId={"difficulty"}
    name={"Schwierigkeit"}
    bind:value={difficulty}
    options={[
        ["Leicht", 1],
        ["Mittel", 2],
        ["Schwer", 3],
    ]}
/>
