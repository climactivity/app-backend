<script lang="ts">
  import {  
    ListGroup, ListGroupItem , Card, CardBody, Col, Container, Row } from 'sveltestrap';
  import { currentInfobyte, Infobyte, baseUrl } from '../stores';

  let selectedInfobyte;

  const refetch = async () => {
    const response = await fetch(`${baseUrl}/infobyte`);
    return await response.json();
  };

  let infobytes: Promise<[{ name: string; _id: string }]> = refetch();

  const unsubscribe = currentInfobyte.subscribe((value) => {
    if (!selectedInfobyte) selectedInfobyte = value;
    if (!value || value._id !== selectedInfobyte._id) infobytes = refetch();
    selectedInfobyte = value;
  });

  const onInfobyteSelected = async (infobyte: { name: string; _id: string }) => {
    infobyte = await fetchInfoBtye(infobyte._id)
    currentInfobyte.set(infobyte);
    console.log(infobyte);
  }

  const fetchInfoBtye = async (id) => {
    if (!id) return;
    const response = await fetch(`${baseUrl}/infobyte/${id}`);
    return await response.json();
  };


  const newInfobyte = () => {
    currentInfobyte.set(new Infobyte());
  }
</script>

<Col xs="3">
  <Card>
    <CardBody>
  {#await infobytes}
    <p>...waiting</p>
  {:then data}
    <ListGroup vertical>
      {#each data as infobyte}
      <ListGroupItem 
        tag="button" action  
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
</CardBody>
</Card>
  <button on:click={newInfobyte}> Add new </button>
  </Col>
