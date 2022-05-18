<script lang="ts">
import { baseUrl } from "$lib/stores/stores";
import StringEdit from "../Editor/string-edit.svelte";
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
<input required id="fileUpload" type="file" class="w-full" bind:files={images}>

<label for="titleInput">Title</label>
<StringEdit id="titleInput" name="titleInput" bind:value={imageMetadata.title} />

<label for="licenseInput">Lizenz</label>
<StringEdit id="licenseInput" name="licenseInput" bind:value={imageMetadata.license} />

<label for="creditInput">Urheber</label>
<StringEdit id="creditInput" name="creditInput" bind:value={imageMetadata.credit} />
<button on:click={uploadImage}>Hochladen</button>
