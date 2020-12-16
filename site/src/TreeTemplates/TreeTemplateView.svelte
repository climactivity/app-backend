<script lang="ts">
    import ImageUpload from '../ImageUpload.svelte'
    import { Form, FormGroup, FormText, Input, Label, Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button } from 'sveltestrap' 
    import { baseUrl } from '../stores'
import TreeTemplateEditor from './TreeTemplateEditor.svelte'
import TreeTemplateList from './TreeTemplateList.svelte'
 
</script>

<section>
    <Row>
        <Col xs="3">
            <TreeTemplateList></TreeTemplateList>
        </Col>
        <Col xs="6">
            <TreeTemplateEditor></TreeTemplateEditor>
        </Col>

    </Row>
</section>