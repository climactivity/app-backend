<script lang="ts">
  import Aside from "./Aside.svelte";
  import InfobyteEditor from "./InfobyteEditor.svelte";
  import { currentInfobyte } from "../stores";
  import { Row, Col, Container } from "sveltestrap";

  let selectedInfobyte = undefined;
  let unsavedChanges = false;

  currentInfobyte.subscribe((value) => {
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
