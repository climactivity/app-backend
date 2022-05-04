<script lang="ts">
import type { Reward } from "./RewardTypes";
export let reward: Reward;
</script>

<div class="body">
    <h5 class="mt-3">Reward</h5>

    <label for="xp">xp</label>
    <input
        id="xp"
        placeholder="xp"
        bind:value={reward.xp}
    />
    <label for="coins">coins</label>
    <input
        id="coins"
        placeholder="coins"
        type="number"
        bind:value={reward.coins}
    />
    <label for="water">water</label>
    <input
        id="water"
        placeholder="water"
        type="number"
        bind:value={reward.water}
    />

</div>
<style>
    .reward {
        border: 1px;
        border-radius: 4px;
        border-style: solid;
        padding: 2px;
    }
</style>