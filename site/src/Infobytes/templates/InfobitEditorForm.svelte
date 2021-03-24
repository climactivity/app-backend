<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Button, Col, Row } from "sveltestrap";
  import {
    currentInfobit,
    currentInfobitIndex,
    Infobit,
    Infobyte,
    isProd,
  } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { createOrUpdateInfobyte } from "../InfobyteService";
  import InfoBitEditor from "./InfoBitEditor.svelte";

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
      currentInfobit.set(selectedInfobit);
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
    $form.infobits = selectedInfobyte.infobits || [];
    $errors.infobits = selectedInfobyte.infobits || [];
  }
</script>

<section>
  <form on:submit={handleSubmit}>
    <Row>
      <Col sm="9">
        <h1 class="mt-2">Infobyte: {$form.name}</h1>
      </Col>
      <Col sm="3">
        <Button primary type="submit">Speichern</Button>
      </Col>
    </Row>
    <InfoBitEditor bind:value={$form.infobits[selectedInfobitIndex]} />
    <DebugInfobyteOutput visible={!isProd} {form} />

    <!--

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

    <DeleteInfobyteButton bind:infobyteId={selectedInfobyte._id} />

    -->
  </form>
</section>
