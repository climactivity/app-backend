<script lang="ts">
  import { ListGroup, ListGroupItem } from "sveltestrap";
  import { baseUrl, currentInfobyte, Infobyte } from "../../stores";
  import InfobyteSelectionList from "../atoms/InfobyteSelectionList.svelte";
  import MasterInfobyteHeader from "../molecules/MasterInfobyteHeader.svelte";

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
</script>

<MasterInfobyteHeader />

{#await infobytes}
  <p>...waiting</p>
{:then data}
  <InfobyteSelectionList infobytes={data} />
{:catch error}
  <p>An error occurred!</p>
{/await}
