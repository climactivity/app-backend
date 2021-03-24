<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Button, Col, Row } from "sveltestrap";
  import { Infobyte, isProd } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { createOrUpdateInfobyte } from "../InfobyteService";
  import InfoBitEditor from "./InfoBitEditor.svelte";

  export let selectedInfobyte: Infobyte;
  export let selectedInfobitIndex: number;

  const { form, errors, handleSubmit } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values: Infobyte) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;

      createOrUpdateInfobyte(infobyte);
      selectedInfobyte.infobits[selectedInfobitIndex] =
        $form.infobits[selectedInfobitIndex];
    },
  });

  $: if (selectedInfobyte && selectedInfobitIndex) {
    $form.infobits = selectedInfobyte.infobits || [];
    $errors.infobits = selectedInfobyte.infobits || [];
  }
</script>

<section>
  <form on:submit={handleSubmit}>
    <Row>
      <Col sm="9">
        <h4 class="mt-2">Infobyte: {$form.name}</h4>
        <h2 class="mt-2">Infobit Nr: {selectedInfobitIndex}</h2>
      </Col>
      <Col sm="3">
        <Button primary type="submit">Speichern</Button>
      </Col>
    </Row>
    <InfoBitEditor bind:value={$form.infobits[selectedInfobitIndex]} />
    <DebugInfobyteOutput visible={!isProd} {form} />
  </form>
</section>
