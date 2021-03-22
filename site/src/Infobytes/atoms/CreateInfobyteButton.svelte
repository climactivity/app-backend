<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobyte, Infobyte } from "../../stores";

  const newInfobyte = () => {
    currentInfobyte.set(new Infobyte());
  };
</script>

<Button color="success" on:click={newInfobyte}>add</Button>
