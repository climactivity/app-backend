<script lang="ts">
    import { ListGroup } from "sveltestrap";
    import { currentQuestionName, Question } from "../../stores";
    import CreateQuestionButton from "../atoms/CreateQuestionButton.svelte";
    import QuestionSelectionListItem from "../atoms/QuestionSelectionListItem.svelte";

    export let questions: Question[];

    let selectedQuestionName: string;

    currentQuestionName.subscribe((name) => (selectedQuestionName = name));
</script>

<ListGroup vertical>
    {#each questions as question}
        <QuestionSelectionListItem
            {question}
            active={question.question === selectedQuestionName}
        />
    {/each}
    <CreateQuestionButton />
</ListGroup>
