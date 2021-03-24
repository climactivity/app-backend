<script lang="ts">
  import type { Infobit } from "../../stores";
  import InfobitSelectionList from "../molecules/InfobitSelectionList.svelte";

  export let infobits: Infobit[];
</script>

Infobit auswählen:

<InfobitSelectionList {infobits} />
