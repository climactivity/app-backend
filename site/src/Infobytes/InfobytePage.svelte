<script lang="ts">
  import { Col, Container, Row } from "sveltestrap";
  import {
    currentInfobitIndex,
    currentInfobyte,
    currentQuestionName,
    Infobyte,
  } from "../stores";
  import InfobitSidebar from "./organisms/InfobitSidebar.svelte";
  import InfobyteSidebar from "./organisms/InfobyteSidebar.svelte";
  import QuestionSidebar from "./organisms/QuestionSidebar.svelte";
  import InfobitEditorForm from "./templates/InfobitEditorForm.svelte";
  import InfobyteEditor from "./templates/InfobyteEditor.svelte";
  import QuestionEditorForm from "./templates/QuestionEditorForm.svelte";

  let selectedInfobyte: Infobyte = null;
  let selectedInfobitIndex: number = null;
  let selectedQuestionName: string = null;

  currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });

  currentInfobitIndex.subscribe((value) => {
    selectedInfobitIndex = value;
  });

  currentQuestionName.subscribe((value) => {
    selectedQuestionName = value;
  });
</script>

<Row>
  <Col xs="12" sm="3">
    <Container>
      {#if !selectedInfobyte}
        <InfobyteSidebar />
      {:else if selectedInfobitIndex === null || selectedInfobitIndex === undefined}
        <InfobitSidebar infobits={selectedInfobyte.infobits} />
      {:else}
        <QuestionSidebar
          questions={selectedInfobyte.questions.filter(
            (q) => q.infobit === selectedInfobitIndex + 1
          )}
        />
      {/if}
    </Container>
  </Col>
  <Col sm="9">
    {#if selectedQuestionName}
      <QuestionEditorForm bind:selectedInfobyte />
    {:else if selectedInfobitIndex !== null && selectedInfobitIndex !== undefined}
      <InfobitEditorForm bind:selectedInfobyte />
    {:else if selectedInfobyte}
      <InfobyteEditor bind:selectedInfobyte />
    {/if}
  </Col>
</Row>
