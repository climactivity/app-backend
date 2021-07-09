<script lang="ts">
    import { Form, FormGroup, FormText, Input, Label, Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button } from 'sveltestrap' 
    import { baseUrl } from '../stores'
import TreeTemplateEditor from './TreeTemplateEditor.svelte'
import TreeTemplateList from './TreeTemplateList.svelte'
 
</script>

<section>
    <Row>
        <TreeTemplateList></TreeTemplateList>
    </Row>
</section>