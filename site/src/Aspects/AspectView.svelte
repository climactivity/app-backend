<script lang="ts">
    import {Col, Row} from 'sveltestrap'
    import AspectList from "./AspectList.svelte";
    import AspectItem from "./AspectItem.svelte";
    import {mockAspects} from "./mockData";
    import {writable} from "svelte/store";
    import {getAspects} from "./AspectData"; 
import { onMount } from 'svelte';

    const selectedAspect = writable(null);
    const aspects = writable([]);

    async function handleDelete(event) {
        $aspects = $aspects.filter(a => a.name !== event.detail.aspect?.name);
    }


    onMount( async () => {
        $aspects = await getAspects()
    })


</script>

<section>
    <Row>
        <Col xs="12" sm="3">
            <AspectList bind:aspects={$aspects} bind:selectedAspect={$selectedAspect}/>
        </Col>
        <Col sm="9">
            <AspectItem aspect={$selectedAspect} on:deleteAspect={handleDelete}/>
        </Col>
    </Row>
</section>