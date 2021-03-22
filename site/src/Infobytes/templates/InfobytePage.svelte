<script lang="ts">
  import InfobyteSidebar from "../organisms/InfobyteSidebar.svelte";
  import InfobyteEditor from "./InfobyteEditor.svelte";
  import { currentInfobyte } from "../../stores";
  import { Row, Col, Container } from "sveltestrap";

  let selectedInfobyte = undefined;
  let unsavedChanges = false;

  currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });
</script>

<Row>
  <Col xs="12" sm="3">
    <InfobyteSidebar />
  </Col>
  <Col sm="9">
    <InfobyteEditor bind:selectedInfobyte bind:unsavedChanges />
  </Col>
</Row>
