<script lang="ts">
  import { Button } from "sveltestrap";
  import { currentInfobyte, Infobyte } from "../../stores";

  const newInfobyte = () => {
    currentInfobyte.set(new Infobyte());
  };

  export let small = false;

  let title = small ? "+" : "Infobyte erstellen";
</script>

<Button style={"min-width: 20px"} color="success" on:click={newInfobyte}
  >{title}
</Button>
