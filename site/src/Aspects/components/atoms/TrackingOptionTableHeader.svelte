<script lang="ts">
    const headers: string[] = ["Answer", "XP", "Coins", "Water", "Action"];
</script>

<thead>
<tr>
    {#each headers as header}
        <th>{header}</th>
    {/each}
</tr>
</thead>