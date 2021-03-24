<script lang="ts">
    import { Button, ButtonToolbar, Input } from "sveltestrap";
    import { Answer, Question } from "../../stores";

    export let question: Question;

    console.log(question);

    const addAnswer = () => {
        question.answers.push(new Answer());
    };

    const removeAnswer = (k) => () => {
        question.answers = question.answers.filter((u, i) => k !== i);
    };
</script>

<div class="form-group">
    <div>
        <label for="question">Frage</label>
        <Input
            type="textarea"
            name="question"
            placeholder="question"
            bind:value={question.question}
        />
    </div>

    {#each question.answers as answer, k}
        <div class="form-group">
            <label for={`question.answers[${k}]`}>
                Antwort
                {k + 1}</label
            >

            <div>
                <label for={`questions.answers[${k}].value`}>Antwort</label>
                <div class="form-control-row">
                    <Input
                        name={`question.answers[${k}].value`}
                        placeholder="Antwort"
                        bind:value={question.answers[k].value}
                    />

                    <label
                        for={`question.answers[${k}].correct`}
                        style="padding: 5px;"
                    >
                        <span class="label-text">Richtig</span>
                        <Input
                            class="checkbox"
                            type="checkbox"
                            name={`question.answers[${k}].correct`}
                            bind:checked={question.answers[k].correct}
                        />
                    </label>

                    <ButtonToolbar>
                        {#if k === question.answers.length - 1}
                            <Button
                                type="button"
                                class="form-control-button"
                                on:click={addAnswer}>+</Button
                            >
                        {/if}
                        {#if question.answers.length !== 1}
                            <Button
                                type="button"
                                class="form-control-button"
                                on:click={() => removeAnswer(k)}>-</Button
                            >
                        {/if}
                    </ButtonToolbar>
                </div>
            </div>
        </div>
    {/each}
</div>

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
