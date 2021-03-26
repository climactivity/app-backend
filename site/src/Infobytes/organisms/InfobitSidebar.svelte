<script lang="ts">
  import type { Infobit } from "../../stores";
  import InfobitSelectionList from "../molecules/InfobitSelectionList.svelte";
  import MasterInfobyteHeader from "../molecules/MasterInfobyteHeader.svelte";

  export let infobits: Infobit[];
</script>

<MasterInfobyteHeader title={"Infobits:"} />

<InfobitSelectionList {infobits} />
