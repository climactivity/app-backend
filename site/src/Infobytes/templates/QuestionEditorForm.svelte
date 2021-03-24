<script lang="ts">
  import { beforeUpdate } from "svelte";

  import { createForm } from "svelte-forms-lib";
  import { Button, Col, Row } from "sveltestrap";
  import { Infobyte, isProd, Question } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { createOrUpdateInfobyte } from "../InfobyteService";
  import QuestionInput from "../organisms/QuestionInput.svelte";

  export let selectedInfobyte: Infobyte;
  export let selectedInfobitIndex: number;
  export let selectedQuestionName: string;

  export let selectedQuestionIndex: number;

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
        <h6 class="mt-2">Infobyte: {$form.name}</h6>
        <h4 class="mt-2">Infobit Nr: {selectedInfobitIndex}</h4>
        <h2 class="mt-2">Frage: {selectedQuestionName}</h2>
      </Col>
      <Col sm="3">
        <Button primary type="submit">Speichern</Button>
      </Col>
    </Row>

    <QuestionInput bind:question={$form.questions[selectedQuestionIndex]} />
    <DebugInfobyteOutput visible={!isProd} {form} />
  </form>
</section>
