<script lang="ts">
import ImageUpload from "./ImageUpload.svelte";
import ImageGallery from "./ImageGallery.svelte"; 
import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'sveltestrap' 

import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
let modalOpen = false;
const toggleModal = () => {
    modalOpen = !modalOpen;
}

const imageUploadedCallback = () => {
    console.log("imageUploadedCallback")
    toggleModal();
    flashToast(2500)
    if (gallery) {
        gallery.refetch()
    }
}

let showToast = false

const flashToast = (duration) => {
    showToast = true
    setTimeout(() => {
        showToast = false;
    }, duration)
}

let gallery
</script>

<style>
    .hidden {
        display: none
    }
    .absolute {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
</style>

<div class={showToast ? "p-3 mb-3 absolute" : "hidden absolute"} >
    <Toast class="mr-1" success isOpen={showToast}>
      <ToastHeader>
        📸 Bild hochgeladen!
        </ToastHeader>
      <ToastBody>
        Dein Bild ist jetzt hochgeladen! Kopier den Permalink mit dem Button in der Gallery!
    </ToastBody>
    </Toast>
</div>

<Button success on:click={toggleModal} style="width: 100%">
    Bild hochladen
</Button>
<ImageGallery bind:this={gallery}/> 


<Modal isOpen={modalOpen} {toggleModal} transitionOptions>
    <ModalHeader  toggle={toggleModal} >
        Bild hochladen
    </ModalHeader>
    <ModalBody>
        <ImageUpload imageUploadedCallback={imageUploadedCallback}/>
    </ModalBody>
  </Modal>