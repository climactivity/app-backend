<script lang="ts">
export let value: string;
export let placeholder: string;
export let label: string = "";
export let id: string; 
export let type = "text";
</script>

<div>
    {#if label}
        <label for="{id}">{label}</label>
    {/if}
    {#if type === "textarea"}
        <textarea id="{id}" type="text" bind:value={value} placeholder={placeholder} {...$$props}/>
    {:else}
        <input id="{id}" type="text" bind:value={value} placeholder={placeholder} {...$$props}/>
    {/if}
</div>