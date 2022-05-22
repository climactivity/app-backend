<script lang="ts">
import type { Reward } from "./RewardTypes";

    export let reward: Reward;
</script>

<Card body>
    <h5 class="mt-3">Reward</h5>

    <Label for="xp">xp</Label>
    <Input
        id="xp"
        placeholder="xp"
        bind:value={reward.xp}
    />
    <Label for="coins">coins</Label>
    <Input
        id="coins"
        placeholder="coins"
        number
        bind:value={reward.coins}
    />
    <Label for="water">water</Label>
    <Input
        id="water"
        placeholder="water"
        number
        bind:value={reward.water}
    />

</Card>
<style>
    .reward {
        border: 1px;
        border-radius: 4px;
        border-style: solid;
        padding: 2px;
    }
</style>