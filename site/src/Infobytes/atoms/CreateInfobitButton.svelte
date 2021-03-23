<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobitIndex, Infobit, Infobyte } from "../../stores";

  export let infobyte: Infobyte;

  const newInfobyte = () => {
    let newInfobit = new Infobit();
    infobyte.infobits.concat(newInfobyte);
    //currentInfobitIndex.set(infobyte.inf);
  };
</script>

<Button color="success" on:click={newInfobyte}>Infobit erstellen</Button>
