<script lang="ts">
import StringEdit from "../Editor/string-edit.svelte";

import type { LocalizedTrackingData } from "./AspectTypes";
export let value: LocalizedTrackingData

</script>

<div>


<StringEdit bind:value={value.question} id="question" placeholder="Frage" class="w-full" label="Frage"/>


</div>