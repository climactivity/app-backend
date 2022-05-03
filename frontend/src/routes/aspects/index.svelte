<script>
import { browser } from "$app/env";

import RichTextEditor from "$lib/components/RichTextEditor/RichTextEditor.svelte";

</script>
<h1 class=''>
    {#if browser}
     <RichTextEditor value={undefined} key="0"/>
    {/if}
</h1>