<script lang="ts">
import type { Aspect } from "$lib/stores/stores";
export let data: Aspect; 
console.log(data);
</script>

{#if data}
<div class="">
    {data.name}
</div>
{/if}
