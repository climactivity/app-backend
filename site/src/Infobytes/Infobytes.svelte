<script lang="ts">
  import Aside from "./Aside.svelte";
  import InfobyteEditor from "./InfobyteEditor.svelte";
  import { currentInfobyte, baseUrl } from "../stores";
  import { Row, Col, Container } from "sveltestrap";

  let selectedInfobyte = undefined;
  let unsavedChanges = false;
  const unsubscribe = currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });
</script>

<Container>
  <Row>
    <Col xs="12" sm="3">
      <Aside bind:unsavedChanges />
    </Col>
    <Col sm="9">
      <InfobyteEditor bind:selectedInfobyte bind:unsavedChanges />
    </Col>
  </Row>
</Container>

<style>
  h1 {
    color: var(--red);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }

  .padded {
    margin: 1em 1em 0 1em;
  }
</style>
