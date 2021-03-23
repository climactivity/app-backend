<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Confirm } from "svelte-confirm";
  import { Button, Input, Label } from "sveltestrap";
  import {
    currentInfobitIndex,
    Infobit,
    Infobyte,
    isProd,
    Question,
  } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import DeleteInfobyteButton from "../atoms/DeleteInfobyteButton.svelte";

  import InfoBitEditor from "./InfoBitEditor.svelte";
  import { createOrUpdateInfobyte, fetchAspects } from "../InfobyteService";
  import InfobyteInputFields from "../organisms/InfobyteInputFields.svelte";
  import QuestionsInput from "../organisms/QuestionsInput.svelte";

  export let selectedInfobyte: Infobyte;

  let selectedInfobitIndex: number;
  let selectedInfobit: Infobit = null;

  currentInfobitIndex.subscribe((index) => {
    selectedInfobitIndex = index;
    if (selectedInfobitIndex === null) {
      selectedInfobit = null;
      return;
    } else {
      selectedInfobit = selectedInfobyte?.infobits[selectedInfobitIndex];
      console.log(selectedInfobit.doc);
    }
  });

  const { form, errors, handleSubmit } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values: Infobyte) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;

      createOrUpdateInfobyte(infobyte);
    },
  });

  $: if (selectedInfobyte) {
    if (form._id !== selectedInfobyte._id) {
      $form.name = selectedInfobyte.name || "";
      $form.frontmatter = selectedInfobyte.frontmatter || "";
      $form.questions = selectedInfobyte.questions || [new Question()];
      $errors.questions = selectedInfobyte.questions || [new Question()];
      $form._id = selectedInfobyte._id || "";
      $form.infobits = selectedInfobyte.infobits || [];
      $errors.infobits = selectedInfobyte.infobits || [];
      ($form.aspect = ""), ($form.factor = ""), ($form.difficulty = "");
    }
  }

  const fetchFactorsForAspect: any = async (aspect) => {
    if (aspects == null) return [];
    if (aspect == null) return [];

    let aspects_data = await aspects;
    return (
      aspects_data.find((a) => a._id === $form.aspect)?.localizedFactors ?? []
    );
  };

  let aspects: Promise<any[]> = fetchAspects($form.region, $form.language);
  $: factors = fetchFactorsForAspect($form.aspect);
</script>

<section>
  <h1>Infobyte: {$form.name}</h1>

  <form on:submit={handleSubmit}>
    {#if selectedInfobit === null}
      <InfobyteInputFields
        bind:region={$form.region}
        bind:language={$form.language}
        bind:name={$form.name}
        bind:frontmatter={$form.frontmatter}
        bind:aspect={$form.aspect}
        bind:factor={$form.factor}
        bind:difficulty={$form.difficulty}
        bind:aspectsPromise={aspects}
        bind:factorsPromise={factors}
      />
    {:else if selectedInfobit !== null}
      <InfoBitEditor bind:value={$form.infobits[selectedInfobitIndex]} />
    {/if}

    <QuestionsInput
      bind:questions={$form.questions}
      bind:infobits={$form.infobits}
      bind:errorQuestions={$errors.questions}
    />

    <Label for={"published"} style="padding: 5px;">
      <Input
        class="checkbox"
        type="checkbox"
        name={"published"}
        bind:checked={$form.published}
      />
      Veröffentlichen
    </Label>
    <Button primary type="submit">Speichern</Button>
  </form>

  <DeleteInfobyteButton bind:infobyteId={selectedInfobyte._id} />

  <DebugInfobyteOutput visible={!isProd} {form} />
</section>
