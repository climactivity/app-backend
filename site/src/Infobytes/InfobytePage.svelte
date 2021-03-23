<script lang="ts">
  import { Col, Container, Row } from "sveltestrap";
  import { currentInfobyte } from "../stores";
  import InfobyteSidebar from "./organisms/InfobyteSidebar.svelte";
  import InfobyteEditor from "./templates/InfobyteEditor.svelte";

  let selectedInfobyte = null;

  currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });
</script>

<Row>
  <Col xs="12" sm="3">
    <Container>
      <InfobyteSidebar />
    </Container>
  </Col>
  <Col sm="9">
    {#if selectedInfobyte}
      <InfobyteEditor bind:selectedInfobyte />
    {/if}
  </Col>
</Row>
