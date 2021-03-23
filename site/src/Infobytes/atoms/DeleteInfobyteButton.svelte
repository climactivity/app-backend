<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobyte } from "../../stores";
  import { deleteInfobyte } from "../InfobyteService";

  export let infobyteId: string;

  const handleDelete = () => {
    if (!infobyteId) return;

    deleteInfobyte(infobyteId).then(() => currentInfobyte.set(null));
  };
</script>

<Button color="danger" on:click={handleDelete}>Löschen</Button>
