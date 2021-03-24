<script lang="ts">
  import type { Question } from "../../stores";
  import QuestionSelectionList from "../molecules/QuestionSelectionList.svelte";

  export let questions: Question[];
</script>

Question auswählen:

<QuestionSelectionList {questions} />
