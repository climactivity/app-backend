<script lang="ts">
export let caption="Sicher?", text = "", confirmAction = "Ja", cancelAction = "Nein";
export let onConfirm: Function;
export let confirm = () => {
    console.log("hi")
    visible = !visible
}

let visible = true
</script>

<div >

<main class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl z-[10000]" class:visible={visible}>
    
    <div class="bg-red-300 p-2">
        <span>{caption}</span>
    </div>
    {text}
    <div class="actions p-2">
        <button on:click={confirm}>{cancelAction}</button>
        <button on:click={onConfirm}>{confirmAction}</button>
    </div>
</main>

<slot {confirm}/>
</div>

<style lang="scss">
    .visible {
        @apply hidden
    }
</style>