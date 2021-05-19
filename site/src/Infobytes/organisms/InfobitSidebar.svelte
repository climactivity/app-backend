<script lang="ts">
  import type { Infobit } from "../../stores";
  import InfobitSelectionList from "../molecules/InfobitSelectionList.svelte";
  import SidebarTitleHeader from "../molecules/SidebarTitleHeader.svelte";

  export let infobits: Infobit[];
</script>

<SidebarTitleHeader title={"Infobits:"} />

<InfobitSelectionList {infobits} />
