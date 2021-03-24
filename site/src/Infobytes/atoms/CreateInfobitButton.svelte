<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobit, Infobit } from "../../stores";

  const newInfobit = () => {
    currentInfobit.set(new Infobit());
  };
</script>

<Button color="success" on:click={() => newInfobit()}>Infobit erstellen</Button>
