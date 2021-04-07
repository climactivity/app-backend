<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import {
    Button,
    Col,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
  } from "sveltestrap";
  import { Infobyte, isProd } from "../../stores";
  import DebugInfobyteOutput from "../atoms/DebugInfobyteOutput.svelte";
  import DeleteInfobyteButton from "../atoms/DeleteInfobyteButton.svelte";
  import { createOrUpdateInfobyte, fetchAspects } from "../InfobyteService";
  import InfobyteInputFields from "../organisms/InfobyteInputFields.svelte";

  export let selectedInfobyte: Infobyte;

  let open = false;
  const toggle = () => (open = !open);

  const { form, handleSubmit } = createForm({
    initialValues: selectedInfobyte,
    onSubmit: async (values: Infobyte) => {
      let infobyte = values;
      if (infobyte._id === "") delete infobyte._id;

      createOrUpdateInfobyte(infobyte).then(() => (open = true));
    },
  });

  $: if (selectedInfobyte) {
    if (form._id !== selectedInfobyte._id) {
      $form.name = selectedInfobyte.name || "";
      $form.frontmatter = selectedInfobyte.frontmatter || "";
      $form._id = selectedInfobyte._id || "";
      $form.aspect = selectedInfobyte.aspect || "";
      $form.factor =
        selectedInfobyte.factor !== null &&
        selectedInfobyte.factor !== undefined
          ? selectedInfobyte.factor
          : "";
      $form.difficulty = selectedInfobyte.difficulty || 0;
      $form.position = selectedInfobyte.position || 0;
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
  let factors: Promise<any[]> = fetchFactorsForAspect($form.aspect);

  $: if ($form.aspect) {
    factors = fetchFactorsForAspect($form.aspect);
  }
</script>

<section>
  <form on:submit={handleSubmit}>
    <Row>
      <Col sm="9">
        <h2 class="mt-2">Infobyte: {$form.name}</h2>
      </Col>
      <Col sm="3">
        <Button color={"success"} type="submit">Speichern</Button>
      </Col>
    </Row>
    <InfobyteInputFields
      bind:region={$form.region}
      bind:language={$form.language}
      bind:name={$form.name}
      bind:aspect={$form.aspect}
      bind:factor={$form.factor}
      bind:difficulty={$form.difficulty}
      bind:aspectsPromise={aspects}
      bind:factorsPromise={factors}
      bind:position={$form.position}
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
  </form>
  <Row>
    <Col sm={{ size: 3, offset: 9 }}>
      <DeleteInfobyteButton bind:infobyteId={selectedInfobyte._id} />
    </Col>
  </Row>

  <DebugInfobyteOutput visible={!isProd} {form} />
</section>

<Modal isOpen={open} {toggle} transitionOptions>
  <ModalHeader>Infobyte wurde gespeichert!</ModalHeader>
  <ModalBody>
    Das Infobyte konnte erfolgreich gespeichert werden. Aktuell ist es hilfreich
    die Anwendung neu zu laden um sicher zu gehen dass auch wirklich alles
    richtig gespeichert wurde.
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={toggle}>Schließen</Button>
  </ModalFooter>
</Modal>
