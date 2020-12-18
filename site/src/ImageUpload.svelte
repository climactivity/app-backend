<script lang="ts">
import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button } from 'sveltestrap' 
export let images; 
function uploadImage() {

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