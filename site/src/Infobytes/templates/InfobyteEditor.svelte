<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Confirm } from "svelte-confirm";
  import { Button, Input, Label } from "sveltestrap";
  import { currentInfobit, Infobyte, isProd, Question } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import DeleteInfobyteButton from "../atoms/DeleteInfobyteButton.svelte";
  import {
    createOrUpdateInfobyte,
    fetchAspects,
    deleteInfobyte,
  } from "../InfobyteService";
  import InfobitsInput from "../organisms/InfobitsInput.svelte";
  import InfobyteInputFields from "../organisms/InfobyteInputFields.svelte";
  import QuestionsInput from "../organisms/QuestionsInput.svelte";

  export let selectedInfobyte: Infobyte;

  let selectedInfobit;

  currentInfobit.subscribe((value) => {
    selectedInfobit = value;
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

  {#if selectedInfobit === null}
    <form on:submit={handleSubmit}>
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
      <Button primary type="submit">Speichern</Button>
      <Confirm let:confirm={confirmThis}>
        <Button
          type="reset"
          on:click={() => confirmThis(deleteInfobyte(selectedInfobyte?._id))}
        >
          Löschen
        </Button>
      </Confirm>

      <InfobitsInput
        bind:infobits={$form.infobits}
        bind:errorInfobits={$errors.infobits}
      />

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
  {/if}

  <DeleteInfobyteButton bind:infobyteId={selectedInfobyte._id} />

  <DebugInfobyteOutput visible={!isProd} {form} />
</section>
