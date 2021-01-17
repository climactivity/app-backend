<script lang="ts">
    import {Input} from 'sveltestrap';
    import type {TrackingRewards} from "../../AspectTypes";

    export let reward: TrackingRewards
    export let step: number;
    export let value: number;
</script>

<td><Input type="number" step="10" min="0" value={reward?.xp}/></td>
<td><Input type="number" step="5" min="0" value={reward?.coins}/></td>
<td><Input type="number" min="0" value={reward?.water}/></td>
