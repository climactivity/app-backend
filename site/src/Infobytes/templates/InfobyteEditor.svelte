<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Confirm } from "svelte-confirm";
  import {
    Answer,
    Question,
    currentInfobyte,
    Infobyte,
    Infobit,
    baseUrl,
    isProd,
  } from "../../stores";
  import InfoBitEditor from "./InfoBitEditor.svelte";
  export let selectedInfobyte: Infobyte;
  export let unsavedChanges: boolean;
  import { Input, Label, Card, Button, ButtonToolbar } from "sveltestrap";
  const { form, errors, handleChange, handleSubmit, isModified } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;
      console.log(values);
      await fetch(
        `${baseUrl}infobyte${infobyte._id ? "/" + infobyte._id : ""}`,
        {
          method: infobyte._id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(infobyte),
          credentials: "include",
        }
      );
      currentInfobyte.set(new Infobyte());
    },
  });

  let editorTest =
    "<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>";
  $: if (editorTest) {
    console.log(editorTest);
  }

  $: unsavedChanges = isModified;

  $: if (selectedInfobyte) {
    console.log(form._id, selectedInfobyte._id);
    if (form._id !== selectedInfobyte._id) {
      $form.name = selectedInfobyte.name || "";
      $form.frontmatter = selectedInfobyte.frontmatter || "";
      $form.questions = selectedInfobyte.questions || [new Question()];
      $errors.questions = selectedInfobyte.questions || [new Question()];
      $form._id = selectedInfobyte._id || "";
      $form.infobits = selectedInfobyte.infobits || [];
      $errors.infobits = selectedInfobyte.infobits || [];
    }
  }

  const addInfobit = () => {
    $form.infobits = $form.infobits.concat(new Infobit());
    $errors.infobits = $errors.infobits.concat(new Infobit());
  };

  const removeInfobit = (i) => () => {
    $form.infobits = $form.infobits.filter((u, j) => j !== i);
    $errors.infobits = $errors.infobits.filter((u, j) => j !== i);
  };

  const addQuestion = () => {
    $form.questions = $form.questions.concat(new Question());
    $errors.questions = $errors.questions.concat(new Question());
  };

  const removeQuestion = (i) => () => {
    $form.questions = $form.questions.filter((u, j) => j !== i);
    $errors.question = $errors.questions.filter((u, j) => j !== i);
  };

  const addAnswer = (j) => () => {
    //console.log(j, $form.questions[j].answers, $form.questions[j].answers.concat(new Answer()))
    if (j) {
      $form.questions[j].answers = $form.questions[j].answers.concat(
        new Answer()
      ); //what?
    }
    $errors.questions[j].answers = $errors.questions[j].answers.concat(
      new Answer()
    );
  };

  const removeAnswer = (j, k) => () => {
    $form.questions[j].answers = $form.questions[j].answers.filter(
      (u, i) => k !== i
    );
    $errors.questions[j].answers = $form.questions[j].answers.filter(
      (u, i) => k !== i
    );
  };

  const deleteInfoByte = async () => {
    if (!selectedInfobyte._id) return;
    const response = await fetch(`/infobyte/${selectedInfobyte._id}`, {
      credentials: "include",

      method: "DELETE",
    });
    currentInfobyte.set(new Infobyte());
    return await response.json();
  };

  const fetchAspects = async () => {
    const response = await fetch(
      `${baseUrl}localized-aspect?${new URLSearchParams({
        r: $form.region,
        l: $form.language,
      })}`,
      {
        credentials: "include",
      }
    );
    return await response.json();
  };

  const fetchFactorsForAspect: any = async (aspect) => {
    if (aspects != null) {
      if (aspect != null) {
        let aspects_data = await aspects;
        return (
          aspects_data.find((a) => a._id === $form.aspect)?.localizedFactors ??
          []
        );
      } else return [];
    } else return [];
  };

  let aspects: Promise<any[]> = fetchAspects();
  $: factors = fetchFactorsForAspect($form.aspect);
</script>

<section>
  <form on:submit={handleSubmit}>
    <h1>Infobyte hinzufügen</h1>

    <label for="region">Region</label>
    <Input
      id="region"
      name="region"
      type="select"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.region}
    >
      <option>DE</option>
    </Input>

    <label for="language">Sprache</label>
    <Input
      id="language"
      name="language"
      type="select"
      on:change={handleChange}
      on:blur={handleChange}
      bind:value={$form.language}
    >
      <option>DE</option>
      <option>EN</option>
    </Input>

    <label for="name">name</label>
    <Input
      id="name"
      name="name"
      on:change={handleChange}
      bind:value={$form.name}
    />

    <label for="frontmatter">Klappentext</label>
    <Input
      id="frontmatter"
      name="frontmatter"
      on:change={handleChange}
      bind:value={$form.frontmatter}
    />

    <label for="aspect">Aspekt</label>
    <Input
      id="aspect"
      name="aspect"
      type="select"
      on:change={handleChange}
      bind:value={$form.aspect}
    >
      <option disabled selected value={null}> -- Aspekt -- </option>
      {#await aspects}
        <option disabled value={null}>Lade...</option>
      {:then data}
        {#each data as aspect}
          <option value={aspect._id}>{aspect.name}</option>
        {/each}
      {:catch error}
        <option disabled value={null}>An error occurred!</option>
      {/await}
    </Input>

    <label for="factor">Gesichtspunkt</label>
    <Input
      id="factor"
      name="factor"
      type="select"
      on:change={handleChange}
      bind:value={$form.factor}
    >
      <option disabled selected value={null}> -- Gesichtspunkt -- </option>
      {#await factors}
        <option disabled value={null}>Lade...</option>
      {:then data}
        {#each data as factor}
          <option value={factor.id}>{factor.name}</option>
        {/each}
      {:catch error}
        <option disabled value={null}>An error occurred!</option>
      {/await}
    </Input>

    <label for="difficulty">Schwierigkeit</label>
    <Input
      id="difficulty"
      name="difficulty"
      type="select"
      on:change={handleChange}
      bind:value={$form.difficulty}
    >
      <option value={1}>Leicht</option>
      <option value={2}>Mittel</option>
      <option value={3}>Schwer</option>
    </Input>

    <!--<InfoBitEditor bind:value={editorTest}/>-->

    <!-- <Carousel perPage={1} autoplay={false} infinite={false}> -->
    <!-- <span class="control" slot="left-control">
        <Fa icon={faCaretLeft} />
      </span> -->
    {#if $form.infobits.length !== 0}
      {#each $form.infobits as infobit, i}
        <InfoBitEditor bind:value={infobit} />
        <div class="form-control-row">
          {#if i === $form.infobits.length - 1}
            <button
              type="button"
              class="form-control-button"
              on:click={addInfobit}>+</button
            >
          {/if}
          {#if $form.infobits.length !== 1}
            <button
              type="button"
              class="form-control-button"
              on:click={removeInfobit(i)}>-</button
            >
          {/if}
        </div>
      {/each}
    {:else}
      <Card body
        >Klicke auf 'Infobit hinzufügen +' um ein Infobit hinzu zufügen!</Card
      >
    {/if}
    <!-- <span class="control" slot="right-control">
        <Fa icon={faCaretRight} />
      </span> -->
    <!-- </Carousel> -->
    {#if $form.infobits.length === 0}
      <Button type="button" class="form-control-button" on:click={addInfobit}
        >Infobit hinzufügen +</Button
      >
    {/if}
    {#each $form.questions as question, j}
      <div class="form-group">
        <label for={`questions[${j}]`}>Frage {j + 1}</label>

        <div>
          <label for={`questions[${j}].question`}>Frage</label>
          <Input
            type="textarea"
            name={`questions[${j}].question`}
            placeholder="question"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.questions[j].question}
          />
          {#if $errors.questions[j].answer}
            <small class="error">{errors.questions[j].answer}</small>
          {/if}
        </div>

        {#each $form.questions[j].answers as answer, k}
          <div class="form-group">
            <label for={`questions[${j}].answers[${k}]`}>
              Antwort
              {k + 1}</label
            >

            <div>
              <label for={`questions[${j}].answers[${k}].value`}>Antwort</label>
              <div class="form-control-row">
                <Input
                  name={`questions[${j}].answers[${k}].value`}
                  placeholder="Antwort"
                  on:change={handleChange}
                  on:blur={handleChange}
                  bind:value={$form.questions[j].answers[k].value}
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
                    bind:checked={$form.questions[j].answers[k].correct}
                  />
                </label>
                {#if $errors.questions[j].answers[k].answer}
                  <small class="error"
                    >{errors.questions[j].answers[k].answer}</small
                  >
                {/if}
                <ButtonToolbar>
                  {#if k === $form.questions[j].answers.length - 1}
                    <Button
                      type="button"
                      class="form-control-button"
                      on:click={addAnswer(j)}>+</Button
                    >
                  {/if}
                  {#if $form.questions[j].answers.length !== 1}
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
                bind:value={$form.questions[j].infobit}
              >
                <option selected value={null}> -- Allgemeine Frage -- </option>
                {#each $form.infobits as infobit, i}
                  <option>{i + 1}</option>
                {/each}
              </Input>
            </div>
          </div>
        {/each}

        <div class="form-control-row">
          {#if j === $form.questions.length - 1}
            <Button
              type="button"
              class="form-control-button"
              on:click={addQuestion}>+</Button
            >
          {/if}
          {#if $form.questions.length !== 1}
            <Button
              type="button"
              class="form-control-button"
              on:click={removeQuestion(j)}>-</Button
            >
          {/if}
        </div>
      </div>
    {/each}

    <Label for={"published"} style="padding: 5px;">
      <Input
        class="checkbox"
        type="checkbox"
        name={"published"}
        bind:checked={$form.published}
      />
      Veröffentlichen
    </Label>
    <Button primary type="submit">Speichern</Button>
    <Confirm let:confirm={confirmThis}>
      <Button type="reset" on:click={() => confirmThis(deleteInfoByte)}>
        Löschen
      </Button>
    </Confirm>
  </form>
  {#if !isProd}
    <div>
      <span>Debug</span>
      <pre>{JSON.stringify($form, null, 2)}</pre>
    </div>
  {/if}
</section>

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

  .form-control-button {
    min-width: auto;
    margin-right: 1em;
  }
</style>
