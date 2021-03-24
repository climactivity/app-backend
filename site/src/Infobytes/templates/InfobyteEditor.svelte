<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import { Button, Col, Row } from "sveltestrap";
  import { Infobyte, isProd } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import { createOrUpdateInfobyte, fetchAspects } from "../InfobyteService";
  import InfobyteInputFields from "../organisms/InfobyteInputFields.svelte";

  export let selectedInfobyte: Infobyte;

  const { form, handleSubmit } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values: Infobyte) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;

      createOrUpdateInfobyte(infobyte);
    },
  });

  $: if (selectedInfobyte) {
    if (form._id !== selectedInfobyte._id) {
      $form.name = selectedInfobyte.name || "";
      $form.frontmatter = selectedInfobyte.frontmatter || "";
      $form._id = selectedInfobyte._id || "";
      ($form.aspect = ""), ($form.factor = ""), ($form.difficulty = "");
    }
  }

  const fetchFactorsForAspect: any = async (aspect) => {
    if (aspects == null) return [];
    if (aspect == null) return [];

    let aspects_data = await aspects;
    return (
      aspects_data.find((a) => a._id === $form.aspect)?.localizedFactors ?? []
    );
  };

  let aspects: Promise<any[]> = fetchAspects($form.region, $form.language);
  $: factors = fetchFactorsForAspect($form.aspect);
</script>

<section>
  <form on:submit={handleSubmit}>
    <Row>
      <Col sm="9">
        <h2 class="mt-2">Infobyte: {$form.name}</h2>
      </Col>
      <Col sm="3">
        <Button primary type="submit">Speichern</Button>
      </Col>
    </Row>
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

    <DebugInfobyteOutput visible={!isProd} {form} />

    <!--

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

    <DeleteInfobyteButton bind:infobyteId={selectedInfobyte._id} />

    -->
  </form>
</section>
