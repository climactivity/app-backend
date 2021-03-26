<script lang="ts">
  import type { Question } from "../../stores";
  import MasterInfobyteHeader from "../molecules/MasterInfobyteHeader.svelte";
  import QuestionSelectionList from "../molecules/QuestionSelectionList.svelte";

  export let questions: Question[];
</script>

<MasterInfobyteHeader title={"Fragen:"} />

<QuestionSelectionList bind:questions />
