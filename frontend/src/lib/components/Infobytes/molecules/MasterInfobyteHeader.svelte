<script lang="ts">
  import { Col, div } from "sveltestrap";
  import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";

  export let title: string;
</script>

<div>
  <Col xs="auto">
    <h4 class="mt-3">{title}</h4>
  </Col>
  <Col xs="2">
    <CreateInfobyteButton small />
  </Col>
</div>
