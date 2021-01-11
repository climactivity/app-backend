<script lang="ts">
    import {Col, Row} from 'sveltestrap'
    import AspectList from "./AspectList.svelte";
    import Aspect from "./AspectItem.svelte";


</script>

<section>
    <Row>
        <Col xs="12" sm="3">
            <AspectList aspects={[]}/>
        </Col>
        <Col sm="9">
            <Aspect/>
        </Col>
    </Row>
</section>