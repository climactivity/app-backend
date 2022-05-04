<script lang="ts">

export let value: string;
export let placeholder: string;
export let label: string;
export let name: string; 


console.log($$props);
</script>

<div>
    <label for="{name}">{label}</label>
    <input id="{name}" type="text" bind:value={value} placeholder={placeholder}>
</div>