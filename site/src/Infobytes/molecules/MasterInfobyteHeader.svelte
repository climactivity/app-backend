<script lang="ts">
    import { Col, Row } from "sveltestrap";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";
</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">Infobytes auswählen:</h4>
    </Col>
    <Col xs="auto">
        <CreateInfobyteButton />
    </Col>
</Row>
