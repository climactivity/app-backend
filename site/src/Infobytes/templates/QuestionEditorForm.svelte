<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Button, Col, Row } from "sveltestrap";
  import { Infobyte, isProd, Question } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { createOrUpdateInfobyte } from "../InfobyteService";
  import QuestionsInput from "../organisms/QuestionsInput.svelte";

  export let selectedInfobyte: Infobyte;

  const { form, errors, handleSubmit } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values: Infobyte) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;

      createOrUpdateInfobyte(infobyte);
    },
  });

  $: if (selectedInfobyte) {
    $form.questions = selectedInfobyte.questions || [new Question()];
    $errors.questions = selectedInfobyte.questions || [new Question()];
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

    <QuestionsInput
      bind:questions={$form.questions}
      bind:infobits={$form.infobits}
      bind:errorQuestions={$errors.questions}
    />
    <DebugInfobyteOutput visible={!isProd} {form} />
  </form>
</section>
