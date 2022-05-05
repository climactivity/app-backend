<script lang="ts">
export let text = "Sicher?", confirmAction = "Ja", cancelAction = "Nein";
export let onConfirm: Function;
export let confirm = () => {
    console.log("hi")
    visible = !visible
}

let visible = false
</script>

<div >

<main class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" class:visible={visible}>
    {text}
    <div class="actions">
        <button>{confirmAction}</button>
        <button>{cancelAction}</button>
    </div>
</main>

<slot {confirm}/>
</div>

<style lang="scss">
    .visible {
        @apply hidden
    }
</style>