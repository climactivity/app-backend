<script lang="ts">
    import QuestList from './QuestList.svelte'
    import QuestEdit from './QuestEdit.svelte'
    import {Row, Col, Card, CardBody, CardFooter, CardTitle, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'sveltestrap' 
    import { QuestDto } from './QuestTypes';
    import { Toast, ToastBody, ToastHeader } from 'sveltestrap';
import { currentInfobit, currentQuestion } from '../stores';

let modalOpen = false;
const toggleModal = () => {
    modalOpen = !modalOpen;
}

let questList = null; 
let currentQuest = new QuestDto()
const questModifiedCallback = () => {
    flashToast(2500)
    if (questList) {
        questList.refetch()
    }
}



let showToast = false

const flashToast = (duration) => {
    showToast = true
    setTimeout(() => {
        showToast = false;
    }, duration)
}

</script>

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


<Row>
    <Col>
        <Button success on:click={toggleModal} style="width: 100%">
            Aufgabe erstellen
        </Button>
            
        <QuestList bind:this={questList} questModifiedCallback/>
    </Col>
    {#if modalOpen}
    <Col xs="12" md="9">
        <QuestEdit questModifiedCallback quest={currentQuest}/>
    </Col>
    {/if}    
</Row>