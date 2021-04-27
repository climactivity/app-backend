<script lang="ts">
import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap' 
import { baseUrl } from '../stores';
export let images; 

let modalOpen = false;

const toggleModal = () => {
    modalOpen = !modalOpen
}
function uploadImage() {
    const formData = new FormData();
    formData.append('file', images[0]);
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
    images = null
}
</script>


<Row>
<Card>
    <CardHeader>
        Bild hinzufügen
    </CardHeader>
    <CardBody>
        <input id="fileUpload" type="file" bind:files={images}>
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