<script lang="ts">
    import ImageUpload from '../ImageUpload.svelte'
    import { Form, FormGroup, FormText, Input, Label, Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button } from 'sveltestrap' 
    import { createForm } from 'svelte-forms-lib';
    import { baseUrl } from '../stores'
    /*
    "_id": "undefined",
	"template_name": "tree0",
	"texture_name": "tree0",
	"ui_name": "Test Baum",
	"preview_name": "2",
	"coin_value": 0,
	"bigpoint_available": ["ernährung"],
	"initial_state": {
		"stage": 0,
		"water": 0.0,
		"water_needed": 40.0,
		"bigpoint": "ernährung",
		"aspect": "pflanzliche_ernährung"
	}
    */

    export let currentTemplate; 
    $: {
        console.log(currentTemplate)
        if (!currentTemplate) {
            currentTemplate = {
                template_name: "tree0",
                texture_name: "tree0",
                ui_name: "Test Baum",
                preview_name: "2",
                coin_value: 0,
                bigpoint_available: ["ernährung"],
                archetype: 'tree',
                initial_state: {
                    stage: 0,
                    water: 0.0,
                    water_needed: 40.0,
                    bigpoint: "ernährung",
                    aspect: "pflanzliche_ernährung"
                }
            }
        } else {
            $form = currentTemplate
        }
    }

    const {
    form,
    errors,
    state,
    handleChange,
    handleSubmit,
    handleReset,
    } = createForm({
        initialValues: {
            currentTemplate
        },
        onSubmit: async (values) => {
            let treeTemplate = values;
            console.log($form, values, treeTemplate)
            if (treeTemplate._id === '') delete treeTemplate._id;
            let result = await fetch(
                `${baseUrl}tree-template${treeTemplate._id ? '/' + treeTemplate._id : ''}`,
                {
                method: treeTemplate._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'include',

                body: JSON.stringify(treeTemplate),
                },
            );
            //currentInfobyte.set(new Infobyte());
        },
    });

    async function deleteTreeTemplate() {
        let id = $form._id
        if(!id) {
            handleReset();
            return;
        }

        let result = await fetch(
                `${baseUrl}tree-template/${id}`,
                {
                    credentials: 'include',

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }        
            },
        );

        handleReset();

    }

</script>

<style>
.bordered {
    font-family: inherit;
    font-size: inherit;
    max-width: 400px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 150ms ease;
    background: var(--white);
}


input:focus,
select:focus{
    outline: none;
    box-shadow: 0 0 0 4px rgb(227, 227, 245);
    border-color: var(--grey);
}

</style>


<section>
    <h1> Baum Template Editor </h1>

    <Form on:submit={handleSubmit}>
        <FormGroup>
            <Label for="template_name">Template Name</Label>
            <Input 
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.template_name} />
            </FormGroup>
            <FormGroup>
            <Label for="texture_name">texture_name</Label>
            <Input 
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.texture_name} />
            </FormGroup>
            <FormGroup>
            <Label for="ui_name">ui_name</Label>
            <Input 
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.ui_name} />
            </FormGroup>
            <FormGroup>
            <Label for="preview_name">preview_name</Label>
            <Input   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.preview_name} />
            </FormGroup>
            <FormGroup>
            <Label for="coin_value">coin_value</Label>
            <Input  
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.coin_value} />
            </FormGroup>
            <FormGroup>
            <Label for="bigpoint_available">bigpoint_available</Label>
            <Input
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.bigpoint_available} />
            </FormGroup>
            <FormGroup>
                <Label for="archetype">archetype</Label>
                <Input
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form.archetype} />
            </FormGroup>
    </Form>
    <Row>
        <Col>
            <Button primary on:click={handleSubmit}>Speichern</Button>
        </Col>
        <Col>
            <Button danger  on:click={deleteTreeTemplate}>Löschen</Button>
        </Col>
    </Row>
</section>