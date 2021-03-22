<script lang="ts">
  import { ListGroup, ListGroupItem, Col, Row, Button } from "sveltestrap";
  import { currentInfobyte, Infobyte, baseUrl } from "../stores";

  let selectedInfobyte;
  export let unsavedChanges;
  const refetch = async () => {
    const response = await fetch(`${baseUrl}infobyte`, {
      credentials: "include",
    });
    return await response.json();
  };

  let infobytes: Promise<[{ name: string; _id: string }]> = refetch();

  currentInfobyte.subscribe((value) => {
    if (!selectedInfobyte) selectedInfobyte = value;
    if (!value || value._id !== selectedInfobyte._id) infobytes = refetch();
    selectedInfobyte = value;
  });

  const onInfobyteSelected = async (infobyte: {
    name: string;
    _id: string;
  }) => {
    if (unsavedChanges) {
      alert("Ungespeicherte Änderungen gehen verloren");
      return;
    }
    const fetchedInfobyte = await fetchInfoBtye(infobyte._id);
    currentInfobyte.set(fetchedInfobyte);
    console.log(infobyte);
  };

  const fetchInfoBtye = async (id: string): Promise<Infobyte> => {
    if (!id) return;
    const response = await fetch(`${baseUrl}infobyte/${id}`, {
      credentials: "include",
    });
    return (await response.json()) as Infobyte;
  };

  const newInfobyte = () => {
    if (unsavedChanges) {
      alert("Ungespeicherte Änderungen gehen verloren");
      return;
    }
    currentInfobyte.set(new Infobyte());
  };
</script>

<Row>
  <Col xs="auto">
    <h4 class="mt-3">Alle Infobytes</h4>
  </Col>

  <Col xs="auto">
    <Button color="success" on:click={newInfobyte}>+</Button>
  </Col>
</Row>

{#await infobytes}
  <p>...waiting</p>
{:then data}
  <ListGroup vertical>
    {#each data as infobyte}
      <ListGroupItem
        tag="button"
        action
        on:click={() => onInfobyteSelected(infobyte)}
        active={selectedInfobyte._id === infobyte._id}
      >
        {infobyte.name}
      </ListGroupItem>
    {/each}
  </ListGroup>
{:catch error}
  <p>An error occurred!</p>
{/await}
