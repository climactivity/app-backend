<script lang="ts">
import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'sveltestrap' 
import { baseUrl } from '../stores';
export let images; 

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
            toggleModal()
        } 
    })
} 

function reset() {
    images = null;
    imageMetadata = new ImageMetadata();
}
</script>


<Row>
<Card>
    <CardHeader>
        Bild hinzufügen
    </CardHeader>
    <CardBody>
        <label for="fileUpload">Bild</label>
        <input required id="fileUpload" type="file" bind:files={images}>
       
        <label for="titleInput">Title</label>
        <Input required id="titleInput" name="titleInput" bind:value={imageMetadata.title} />
       
        <label for="licenseInput">Lizenz</label>
        <Input required id="licenseInput" name="licenseInput" bind:value={imageMetadata.license} />
       
        <label for="creditInput">Urheber</label>
        <Input required id="creditInput" name="creditInput" bind:value={imageMetadata.credit} />

    </CardBody>
    <CardFooter>
        <Button on:click={uploadImage}>Hochladen</Button>
        <Button on:click={reset}>Zurücksetzen</Button>
    </CardFooter>
</Card>
</Row>

<Modal isOpen={modalOpen} {toggleModal} transitionOptions>
    <ModalHeader>Das Bild wurde gespeichert!</ModalHeader>
    <!-- <ModalBody>
      Das Frage konnte erfolgreich gelöscht werden. Aktuell ist es hilfreich die
      Anwendung neu zu laden um sicher zu gehen dass auch wirklich alles richtig
      gespeichert wurde.
    </ModalBody> -->
    <ModalFooter>
      <Button color="danger" on:click={toggleModal}>Schließen</Button>
    </ModalFooter>
  </Modal>