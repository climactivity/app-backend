<script lang="ts">
  import type { Question } from "../../stores";
  import SidebarTitleHeader from "../molecules/SidebarTitleHeader.svelte";
  import QuestionSelectionList from "../molecules/QuestionSelectionList.svelte";

  export let questions: Question[];
</script>

<SidebarTitleHeader title={"Antworten:"} />

<QuestionSelectionList {questions} />
