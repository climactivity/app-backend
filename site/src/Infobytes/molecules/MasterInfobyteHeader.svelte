<script lang="ts">
    import { Col, Row } from "sveltestrap";
    import CreateInfobyteButton from "../atoms/CreateInfobyteButton.svelte";

    export let title: string;
</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">{title}</h4>
    </Col>
    <Col xs="2">
        <CreateInfobyteButton small />
    </Col>
</Row>
