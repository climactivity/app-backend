<script lang="ts">
import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, ButtonGroup } from 'sveltestrap' 
import { baseUrl } from '../stores';
export let images; 
export let imageUploadedCallback
let modalOpen = false;

class ImageMetadata {
    title: string = "";
    license: string = "";
    credit: string = "";

}

let imageMetadata = new ImageMetadata();

const toggleModal = () => {
    modalOpen = !modalOpen;
}
function uploadImage() {
    const formData = new FormData();
    formData.append('file', images[0]);
    formData.append('meta', JSON.stringify(imageMetadata)); 
    fetch(`${baseUrl}image-upload/upload`, {
        method: 'POST',
        body: formData
    }).then(res => {
        console.log(res);
        if (+status <= 400) {
            //toggleModal()
            if (imageUploadedCallback !== null) {
                imageUploadedCallback()
            }
        } 
    })
} 

function reset() {
    images = null;
    imageMetadata = new ImageMetadata();
}
</script>



<label for="fileUpload">Bild</label>
<input required id="fileUpload" type="file" bind:files={images}>

<label for="titleInput">Title</label>
<Input required id="titleInput" name="titleInput" bind:value={imageMetadata.title} />

<label for="licenseInput">Lizenz</label>
<Input required id="licenseInput" name="licenseInput" bind:value={imageMetadata.license} />

<label for="creditInput">Urheber</label>
<Input required id="creditInput" name="creditInput" bind:value={imageMetadata.credit} />
<Col xs="6">
<Button on:click={uploadImage}>Hochladen</Button>
</Col>
<!-- <Col xs="6">
<Button on:click={reset}>Zurücksetzen</Button>
</Col> -->