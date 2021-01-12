<script lang="ts">
    import {
        Row,
        Col,
        InputGroup,
        InputGroupAddon,
        InputGroupText,
        Input,
        ListGroup,
        ListGroupItem,
        Container
    } from 'sveltestrap';
    import type Aspect from "./AspectTypes";

    export let aspect : Aspect;
</script>

<h4 class="mt-3">Current Aspect</h4>
<div>
    <Row>
        <Col>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="{aspect?.name}"/>
            </InputGroup>
        </Col>
        <Col>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="icon"/>
            </InputGroup>
        </Col>
    </Row>
    <Row>
        <h5 class="mt-3">Description</h5>
        <InputGroup>
            <Input type="textarea" placeholder="description"/>
        </InputGroup>
    </Row>

    <Row>
        <h5 class="mt-3">Quiz elements</h5>
        <Container>
            <ListGroup>
                <ListGroupItem action>Active</ListGroupItem>
                <ListGroupItem action>Bravo</ListGroupItem>
                <ListGroupItem action>Charlie</ListGroupItem>
                <ListGroupItem action>Delta</ListGroupItem>
            </ListGroup>
        </Container>
    </Row>
</div>