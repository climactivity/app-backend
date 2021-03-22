<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Confirm } from "svelte-confirm";
  import { Button, Input, Label } from "sveltestrap";
  import {
    baseUrl,
    currentInfobyte,
    Infobyte,
    isProd,
    Question,
  } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { fetchAspects } from "../InfobyteService";
  import InfobitsInput from "../organisms/InfobitsInput.svelte";
  import InfobyteInputFields from "../organisms/InfobyteInputFields.svelte";
  import QuestionsInput from "../organisms/QuestionsInput.svelte";

  export let selectedInfobyte: Infobyte;

  const { form, errors, handleSubmit } = createForm({
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

  const deleteInfoByte = async () => {
    if (!selectedInfobyte._id) return;
    const response = await fetch(`/infobyte/${selectedInfobyte._id}`, {
      credentials: "include",

      method: "DELETE",
    });
    currentInfobyte.set(new Infobyte());
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

  let aspects: Promise<any[]> = fetchAspects($form.region, $form.language);
  $: factors = fetchFactorsForAspect($form.aspect);
</script>

<section>
  <form on:submit={handleSubmit}>
    <InfobyteInputFields
      bind:region={$form.region}
      bind:language={$form.language}
      bind:name={$form.name}
      bind:frontmatter={$form.frontmatter}
      bind:aspect={$form.aspect}
      bind:factor={$form.factor}
      bind:difficulty={$form.difficulty}
      bind:aspectsPromise={aspects}
      bind:factorsPromise={factors}
    />

    <InfobitsInput
      bind:infobits={$form.infobits}
      bind:errorInfobits={$errors.infobits}
    />

    <QuestionsInput
      bind:questions={$form.questions}
      bind:infobits={$form.infobits}
      bind:errorQuestions={$errors.questions}
    />

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

  <DebugInfobyteOutput visible={!isProd} {form} />
</section>
