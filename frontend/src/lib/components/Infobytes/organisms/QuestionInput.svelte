<script lang="ts">
    import { Answer, Question } from '$lib/stores/stores';

    export let question: Question;

    const addAnswer = () => {
        question.answers = [...question.answers, new Answer()];
    };

    const removeAnswer = (index) => {
        question.answers = question.answers.filter((u, i) => index !== i);
    };
</script>

<div>
    <label for="question">Frage</label>
    <Input
        required
        type="textarea"
        name="question"
        placeholder="question"
        bind:value={question.question}
    />
</div>

<Table responsive>
    <thead>
        <tr>
            <th width={"2%"}>#</th>
            <th>Antwort</th>
            <th>Richtig</th>
            <th>Entfernen</th>
        </tr>
    </thead>
    <tbody>
        {#each question.answers as answer, index}
            <tr>
                <th scope="row">{index + 1}</th>
                <td>
                    <Input
                        required
                        name={`question.answers[${index}].value`}
                        placeholder="Antwort"
                        bind:value={answer.value}
                    />
                </td>
                <td>
                    <Input
                        class="checkbox"
                        type="checkbox"
                        name={`question.answers[${index}].correct`}
                        bind:checked={answer.correct}
                    />
                </td>
                <td>
                    <Button
                        color="danger"
                        size="sm"
                        type="button"
                        name={`question.answers[${index}].delete`}
                        on:click={() => removeAnswer(index)}
                    >
                        Entfernen
                    </Button>
                </td>
            </tr>
        {/each}
    </tbody>
</Table>
<Button
    color="success"
    type="button"
    name="Neue Antwort hinzufügen"
    on:click={addAnswer}
>
    Neue Antwort Hinzufügen
</Button>
