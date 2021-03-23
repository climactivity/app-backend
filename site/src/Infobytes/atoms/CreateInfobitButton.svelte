<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobit, Infobit, Infobyte } from "../../stores";

  export let infobyte: Infobyte;

  const newInfobyte = () => {
    let newInfobyte = new Infobit();
    infobyte.infobits.concat(newInfobyte);
    currentInfobit.set(newInfobyte);
  };
</script>

<Button color="success" on:click={newInfobyte}>Infobit erstellen</Button>
