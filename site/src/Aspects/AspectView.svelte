<script lang="ts">
    import {Col, Row} from 'sveltestrap'
    import AspectList from "./AspectList.svelte";
    import AspectItem from "./AspectItem.svelte";
    import {mockAspects} from "./mockData";
    import {writable} from "svelte/store";

    const selectedAspect = writable(null);
</script>

<section>
    <Row>
        <Col xs="12" sm="3">
            <AspectList aspects={mockAspects} bind:selectedAspect={$selectedAspect}/>
        </Col>
        <Col sm="9">
            <AspectItem aspect={$selectedAspect}/>
        </Col>
    </Row>
</section>