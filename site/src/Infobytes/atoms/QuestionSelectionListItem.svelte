<script lang="ts">
    import { ListGroupItem } from "sveltestrap";
    import { currentQuestionName, Question } from "../../stores";

    export let question: Question;
    export let active: boolean;

    const onInfobitSelected = () => {
        if (active) {
            currentQuestionName.set(null);
        } else {
            currentQuestionName.set(question.question);
        }
    };
</script>

<ListGroupItem tag="button" action on:click={onInfobitSelected} {active}>
    {question.question}
</ListGroupItem>
