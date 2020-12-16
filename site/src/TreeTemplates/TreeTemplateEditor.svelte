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

    const {
    form,
    errors,
    state,
    handleChange,
    handleSubmit,
    handleReset,
    } = createForm({
        initialValues: {
            template_name: "tree0",
            texture_name: "tree0",
            ui_name: "Test Baum",
            preview_name: "2",
            coin_value: 0,
            bigpoint_available: ["ernährung"],
            initial_state: {
                stage: 0,
                water: 0.0,
                water_needed: 40.0,
                bigpoint: "ernährung",
                aspect: "pflanzliche_ernährung"
            }
        },
        onSubmit: async (values) => {
            let treeTemplate = values;
            if (treeTemplate._id === '') delete treeTemplate._id;
            let result = await fetch(
                `${baseUrl}/treeTemplate${treeTemplate._id ? '/' + treeTemplate._id : ''}`,
                {
                method: treeTemplate._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(treeTemplate),
                },
            );
            //currentInfobyte.set(new Infobyte());
        },

        
    });
</script>

<section>
    <h1> Baum Template Editor </h1>

    <Form on:submit={handleSubmit}>
        <FormGroup>
            <Label for="template_name">Template Name</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.template_name} />
            </FormGroup>
            <FormGroup>
            <Label for="texture_name">texture_name</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.texture_name} />
            </FormGroup>
            <FormGroup>
            <Label for="ui_name">ui_name</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.ui_name} />
            </FormGroup>
            <FormGroup>
            <Label for="preview_name">preview_name</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.preview_name} />
            </FormGroup>
            <FormGroup>
            <Label for="coin_value">coin_value</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.coin_value} />
            </FormGroup>
            <FormGroup>
            <Label for="bigpoint_available">bigpoint_available</Label>
            <Input plaintext   
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.bigpoint_available} />
            </FormGroup>
    </Form>
</section>