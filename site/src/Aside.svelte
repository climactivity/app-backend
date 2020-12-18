<script lang="ts">
  import { currentInfobyte, Infobyte, baseUrl } from './stores';

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

<style>
  aside {
    float: left;
    background-color: var(--grey);
    padding: 8px;
    border-radius: 8px;
  }

  ul {
    list-style-type: none;
  }

  @media (min-width: 640px) {
    aside {
      width: 20vw;
      height: 100vh;
    }
  }
</style>

<aside>
  {#await infobytes}
    <p>...waiting</p>
  {:then data}
    <ul>
      {#each data as infobyte}
        <li
          class:selected={currentInfobyte._id === infobyte._id}
          on:click={() => onInfobyteSelected(infobyte)}>
          {infobyte.name}
        </li>
      {/each}
    </ul>
  {:catch error}
    <p>An error occurred!</p>
  {/await}

  <button on:click={newInfobyte}> Add new </button>
</aside>
