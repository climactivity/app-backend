<script lang="ts">
    import QuestList from './QuestList.svelte'
    import QuestEdit from './QuestEdit.svelte'
import { QuestDto } from './QuestTypes';
let modalOpen = false;
const toggleModal = () => {
    modalOpen = !modalOpen;
}

let questList = null; 

const questModifiedCallback = () => {
    if (questList) {
        questList.refetch()
    }
}
</script>


<div>
    <QuestList bind:this={questList} questModifiedCallback/>
    <QuestEdit questModifiedCallback quest={new QuestDto}/>
</div>