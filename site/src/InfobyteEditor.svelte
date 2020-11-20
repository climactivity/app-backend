<script lang="ts">
  import { createForm } from 'svelte-forms-lib';
  import { createEventDispatcher } from 'svelte';
  import { Answer, Question, currentInfobyte, Infobyte } from './stores';
import { init } from 'svelte/internal';
  let selectedInfobyte;

  const unsubscribe = currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });

  let infobyte;
  const fetchInfoBtye = async (id) => {
    console.log(selectedInfobyte);
    if (!id) return;
    const response = await fetch(`/infobyte/${id}`);
    return await response.json();
  };

  const initialQuestions = [new Question()];

  const {
    form,
    errors,
    state,
    handleChange,
    handleSubmit,
    handleReset,
  } = createForm({
    initialValues: {
      name: '',
      frontmatter: '',
      questions: initialQuestions,
    },
    onSubmit: async (values) => {
      infobyte = infobyte ? infobyte : {};
      infobyte.name = values.name;
      infobyte.frontmatter = values.frontmatter;

      let result = await fetch(
        `/infobyte${infobyte._id ? '/' + infobyte._id : ''}`,
        {
          method: infobyte._id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({_id: infobyte._id, ...values}),
        },
      );
      currentInfobyte.set(result);
    },
  });

  const addQuestion = () => {
    $form.questions = $form.questions.concat(new Question());
    $errors.questions = $errors.questions.concat(new Question());
  };

  const removeQuestion = (i) => () => {
    $form.questions = $form.questions.filter((u, j) => j !== i);
    $errors.question = $errors.questions.filter((u, j) => j !== i);
  };

  const addAnswer = (j) => () => {
    console.log( $form.questions[j])
    $form.questions[j].answers = $form.questions[j].answers.concat(new Answer());
    console.log( $form.questions[j])
    $errors.questions[j].answers = $errors.questions[j].answers.concat(new Answer());
  };

  const removeAnswer = (j, k) => () => {
    $form.questions[j].answers = $form.questions[j].answers.filter((u, i) => k !== i);
    $errors.questions[j].answers = $form.questions[j].answers.filter((u, i) => k !== i);
  };

  $: if (selectedInfobyte) {
    if (!selectedInfobyte._id) {
      handleReset();
      infobyte = {};
    } else {
      fetchInfoBtye(selectedInfobyte._id).then((data) => {
        console.log('recieved data: ', data);
        infobyte = data;
        $form.name = data.name || '';
        $form.frontmatter = data.frontmatter || '';
        console.log(data.questions)
        $form.questions = data.questions || initialQuestions
      });
    }
  }

  const deleteInfoByte = async () => {
    if (!selectedInfobyte._id) return;
    const response = await fetch(`/infobyte/${selectedInfobyte._id}`, {
      method: 'DELETE',
    });
    currentInfobyte.set(new Infobyte());
    return await response.json();
  };
</script>

<style>
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    max-width: 400px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 150ms ease;
    background: var(--white);
  }

  select {
    height: 45px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgb(227, 227, 245);
    border-color: var(--grey);
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    color: #ccc;
  }

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

  .danger {
    background-color: var(--red);
  }

  .danger:disabled {
    background-color: var(--grey);
  }

  .danger:focus:not(:disabled) {
    box-shadow: 0 0 0 4px var(--red);
  }

  .danger:hover:not(:disabled) {
    background-color: var(--red-dark);
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

  .form-control-button {
    min-width: auto;
    margin-right: 1em;
  }
</style>

<section>
  <form on:submit={handleSubmit}>
    <h1>Infobyte hinzufügen</h1>

    <label for="name">name</label>
    <input
      id="name"
      name="name"
      on:change={handleChange}
      bind:value={$form.name} />

    <label for="frontmatter">frontmatter</label>
    <input
      id="frontmatter"
      name="frontmatter"
      on:change={handleChange}
      bind:value={$form.frontmatter} />

    {#each $form.questions as question, j}
      <div class="form-group">
        <label for={`questions[${j}]`}>Frage {j + 1}</label>

        <div>
          <label for={`questions[${j}].question`}>Frage</label>
          <input
            name={`questions[${j}].question`}
            placeholder="question"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.questions[j].question} />
          {#if $errors.questions[j].answer}
            <small class="error">{errors.questions[j].answer}</small>
          {/if}

        </div>

        {#each $form.questions[j].answers as answer, k}
          <div class="form-group">
            <label for={`questions[${j}].answers[${k}]`}>
              Antwort
              {k + 1}</label>

            <div>
              <label for={`questions[${j}].answers[${k}].value`}>Antwort</label>
              <div class="form-control-row">

              <input
                name={`questions[${j}].answers[${k}].value`}
                placeholder="Antwort"
                on:change={handleChange}
                on:blur={handleChange}
                bind:value={$form.questions[j].answers[k].value} />
              {#if $errors.questions[j].answers[k].answer}
                <small
                  class="error">{errors.questions[j].answers[k].answer}</small>
              {/if}
                {#if k === $form.questions[j].answers.length - 1}
                  <button
                    type="button"
                    class="form-control-button"
                    on:click={addAnswer(j)}>+</button>
                {/if}
                {#if $form.questions[j].answers.length !== 1}
                  <button
                    type="button"
                    class="form-control-button"
                    on:click={removeAnswer(j, k)}>-</button>
                {/if}
              </div>
            </div>
          </div>
        {/each}
        <div class="form-control-row">
          {#if j === $form.questions.length - 1}
            <button
              type="button"
              class="form-control-button"
              on:click={addQuestion}>+</button>
          {/if}
          {#if $form.questions.length !== 1}
            <button
              type="button"
              class="form-control-button"
              on:click={removeQuestion(j)}>-</button>
          {/if}
        </div>

      </div>
    {/each}

    <button type="submit">Speichern</button>
  </form>
  <button type="reset" on:click={deleteInfoByte} class="danger">Löschen</button>

  <div>
    <span>Debug</span>

    <pre>{JSON.stringify($form, null, 2)}</pre>
  </div>
</section>
