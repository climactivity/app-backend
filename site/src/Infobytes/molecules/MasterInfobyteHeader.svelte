<script lang="ts">
    import { Col, Row } from "sveltestrap";

    export let title: string;
</script>

<Row>
    <Col xs="auto">
        <h4 class="mt-3">{title}</h4>
    </Col>
</Row>
