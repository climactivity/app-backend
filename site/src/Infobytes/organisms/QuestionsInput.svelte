<script lang="ts">
    import { Button, ButtonToolbar, Input } from "sveltestrap";
    import { Answer, Question } from "../../stores";

    export let questions: any[];
    export let infobits: any[];
    export let errorQuestions: any;

    const addQuestion = () => {
        questions = questions.concat(new Question());
        errorQuestions = errorQuestions.concat(new Question());
    };

    const removeQuestion = (i) => () => {
        questions = questions.filter((u, j) => j !== i);
        errorQuestions = errorQuestions.filter((u, j) => j !== i);
    };

    const addAnswer = (j) => () => {
        if (j) {
            questions[j].answers = questions[j].answers.concat(new Answer());
        }
        errorQuestions[j].answers = errorQuestions[j].answers.concat(
            new Answer()
        );
    };

    const removeAnswer = (j, k) => () => {
        questions[j].answers = questions[j].answers.filter((u, i) => k !== i);
        errorQuestions[j].answers = questions[j].answers.filter(
            (u, i) => k !== i
        );
    };
</script>

{#each questions as question, j}
    <div class="form-group">
        <label for={`questions[${j}]`}>Frage {j + 1}</label>

        <div>
            <label for={`questions[${j}].question`}>Frage</label>
            <Input
                type="textarea"
                name={`questions[${j}].question`}
                placeholder="question"
                bind:value={questions[j].question}
            />
            {#if errorQuestions[j].answer}
                <small class="error">{errorQuestions[j].answer}</small>
            {/if}
        </div>

        {#each questions[j].answers as answer, k}
            <div class="form-group">
                <label for={`questions[${j}].answers[${k}]`}>
                    Antwort
                    {k + 1}</label
                >

                <div>
                    <label for={`questions[${j}].answers[${k}].value`}
                        >Antwort</label
                    >
                    <div class="form-control-row">
                        <Input
                            name={`questions[${j}].answers[${k}].value`}
                            placeholder="Antwort"
                            bind:value={questions[j].answers[k].value}
                        />

                        <label
                            for={`questions[${j}].answers[${k}].correct`}
                            style="padding: 5px;"
                        >
                            <span class="label-text">Richtig</span>
                            <Input
                                class="checkbox"
                                type="checkbox"
                                name={`questions[${j}].answers[${k}].correct`}
                                bind:checked={questions[j].answers[k].correct}
                            />
                        </label>
                        {#if errorQuestions[j].answers[k].answer}
                            <small class="error"
                                >{errorQuestions[j].answers[k].answer}</small
                            >
                        {/if}
                        <ButtonToolbar>
                            {#if k === questions[j].answers.length - 1}
                                <Button
                                    type="button"
                                    class="form-control-button"
                                    on:click={addAnswer(j)}>+</Button
                                >
                            {/if}
                            {#if questions[j].answers.length !== 1}
                                <Button
                                    type="button"
                                    class="form-control-button"
                                    on:click={removeAnswer(j, k)}>-</Button
                                >
                            {/if}
                        </ButtonToolbar>
                    </div>
                </div>
                <div>
                    <span> Für Infobit? </span>
                    <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        bind:value={questions[j].infobit}
                    >
                        <option selected value={null}>
                            -- Allgemeine Frage --
                        </option>
                        {#each infobits as infobit, i}
                            <option>{i + 1}</option>
                        {/each}
                    </Input>
                </div>
            </div>
        {/each}

        <div class="form-control-row">
            {#if j === questions.length - 1}
                <Button
                    type="button"
                    class="form-control-button"
                    on:click={addQuestion}>+</Button
                >
            {/if}
            {#if questions.length !== 1}
                <Button
                    type="button"
                    class="form-control-button"
                    on:click={removeQuestion(j)}>-</Button
                >
            {/if}
        </div>
    </div>
{/each}

<style>
    label {
        display: block;
        color: var(--grey-dark);
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 4px;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1.9px;
        line-height: 2;
    }

    .form-group {
        background-color: var(--grey);
        padding: 8px;
        border-radius: 8px;
        display: flex;
        align-items: baseline;
        flex-direction: column;
    }

    .form-control-row {
        display: flex;
    }
</style>
