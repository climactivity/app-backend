<script lang="ts">
    export let label = "Section Heading"
</script>

<div class="bg-white p-2 rounded-md shadow-sm my-2 mr-2">
    <div class="w-full text-lg  ">
        <span>{label}</span>
    </div>
    <div class="p-2 bg-white">
        <slot/>
    </div>
</div>

