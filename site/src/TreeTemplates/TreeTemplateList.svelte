
<script lang="ts">
import { baseUrl } from '../stores'
import { ListGroup, ListGroupItem , Card, CardBody, Col, Container, Row } from 'sveltestrap';
import TreeTemplateEditor from './TreeTemplateEditor.svelte';

const refetch = async () => {
    const response = await fetch(`${baseUrl}/admin/tree-template`);
    return await response.json();
};

class TreeTemplate {
    template_name = "tree0";
    texture_name = "tree0";
    ui_name = "Test Baum";
    preview_name = "2";
    coin_value = 0;
    bigpoint_available = ["ernährung"];
    initial_state: {
        stage: 0,
        water: 0.0,
        water_needed: 40.0,
        bigpoint: "ernährung",
        aspect: "pflanzliche_ernährung"
    }
}

let treeTemplates: Promise<[{ name: string; _id: string }]> = refetch();

let selectedTreeTemplate = new TreeTemplate();


const ontreeTemplateSelected = async (treeTemplate: { name: string; _id: string }) => {
    let treeTemplateData = await fetchTreeTemplate(treeTemplate._id)
    selectedTreeTemplate = treeTemplateData;
  }

  const fetchTreeTemplate = async (id) => {
    if (!id) return;
    const response = await fetch(`${baseUrl}/admin/tree-template/${id}`);
    return await response.json();
  };


  const newtreeTemplate = () => {
    selectedTreeTemplate = new TreeTemplate();
  }

</script>

<Col xs="3">
    <Card>
        <CardBody>
    {#await treeTemplates}
        <p>...waiting</p>
    {:then data}
        <ListGroup vertical>
        {#each data as treeTemplate}
        <ListGroupItem 
            tag="button" action  
            on:click={() => ontreeTemplateSelected(treeTemplate)}
            active={selectedTreeTemplate._id === treeTemplate._id}
            >
            {treeTemplate.ui_name}
        </ListGroupItem>
        {/each}
        </ListGroup>
    {:catch error}
        <p>An error occurred!</p>
    {/await}
    </CardBody>
    </Card>
    <button on:click={newtreeTemplate}> Add new </button>

</Col>
<Col xs="6">
    <TreeTemplateEditor bind:currentTemplate={selectedTreeTemplate}></TreeTemplateEditor>
</Col>


  