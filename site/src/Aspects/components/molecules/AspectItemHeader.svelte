<script lang="ts">
    import {Col, Row} from 'sveltestrap';
    import AspectTitle from "../atoms/AspectTitle.svelte";
    import RemoveAspectButton from "../atoms/RemoveAspectButton.svelte";
    import {createEventDispatcher} from "svelte";
    import {Aspect} from "../../AspectTypes";

    export let aspect: Aspect;

    const dispatch = createEventDispatcher();

    function handleDelete() {
        dispatch("deleteAspect", {
            aspect: aspect
        });
        aspect = null;
    }
</script>

<Row>
    <Col xs="auto">
        <AspectTitle title={aspect?.name}/>
    </Col>

    <Col xs="auto">
        <RemoveAspectButton clickHandler={handleDelete}/>
    </Col>
</Row>