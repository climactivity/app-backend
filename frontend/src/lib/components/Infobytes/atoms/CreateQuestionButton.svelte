<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentQuestion, Question } from '$lib/stores/stores'

  const newQuestion = () => {
    currentQuestion.set(new Question());
  };
</script>

<Button color="success" on:click={() => newQuestion()}>Frage erstellen</Button>
