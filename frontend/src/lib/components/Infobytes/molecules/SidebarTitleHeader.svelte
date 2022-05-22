<script lang="ts">
  import { Col, div } from "sveltestrap";

  export let title: string;
</script>

<div>
  <Col xs="auto">
    <h4 class="mt-3">{title}</h4>
  </Col>
</div>
