<script lang="ts">
    import QuestList from "./QuestList.svelte";
    import QuestEdit from "./QuestEdit.svelte";
    import {
        Row,
        Col,
        Card,
        CardBody,
        CardFooter,
        CardTitle,
        CardHeader,
        Button,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Input,
        Toast,
        ToastBody,
        ToastHeader,
    } from "sveltestrap";
    import { QuestDto } from "./QuestTypes";

    import { currentInfobit, currentQuestion } from "$lib/stores/stores";

    let modalOpen: any = false;
    const toggleModal = () => {
        modalOpen = !modalOpen;
        localStorage.setItem("modelOpen", modalOpen);
    };

    let questList = null;
    let currentQuest = new QuestDto();
    const questModifiedCallback = () => {
        flashToast(2500);
        if (questList) {
            questList.refetch();
        }
    };

    const questSelected = (quest) => {
        currentQuest = { ...currentQuest, ...quest };
        if (currentQuest) {
            modalOpen = true;
        }
    };

    let showToast = false;

    const flashToast = (duration) => {
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, duration);
    };
</script>

<!-- <div class={showToast ? "p-3 mb-3 absolute" : "hidden absolute"} >
    <Toast class="mr-1" success isOpen={showToast}>
      <ToastHeader>
        Aufgabe hochgeladen!
        </ToastHeader>
    </Toast>
</div> -->

<div>
    <div>
        <button>
            Aufgabe erstellen
        </button>

        <QuestList bind:this={questList} questModifiedCallback={questModifiedCallback} questSelectedCallback={questSelected}/>
    </div>

</div>
