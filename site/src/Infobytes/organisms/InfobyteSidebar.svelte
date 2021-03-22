<script lang="ts">
  import { getInfobytes } from "../InfobyteService";
  import InfobyteSelectionList from "../molecules/InfobyteSelectionList.svelte";
  import MasterInfobyteHeader from "../molecules/MasterInfobyteHeader.svelte";
  import type { infobyteIdentifier } from "../particles/Infobyte";

  const infobytes: Promise<infobyteIdentifier[]> = getInfobytes();
</script>

<MasterInfobyteHeader />

{#await infobytes}
  <p>...lade</p>
{:then infobytes}
  <InfobyteSelectionList {infobytes} />
{:catch error}
  <p>Hmm da ist was schief gelaufen:</p>
  <pre>{error}</pre>
{/await}
