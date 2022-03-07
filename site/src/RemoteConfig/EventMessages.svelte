<script lang="ts">
import { onMount } from "svelte";

import type { EventMessage } from "./RemoteConfigTypes";

export let serverConfig
let currentMessges
onMount( () => {
    currentMessges = `${serverConfig.nk_server_host}/v2/rpc/get_event_messages?http_key=${serverConfig.nk_server_key}&unwrap`;
})
</script>


<div>
    
    <!-- list currently defined events -->

    {#if currentMessges}
        <span>{JSON.stringify(currentMessges)}</span>
    {/if}

    <!-- update events inline?-->

    <!-- add new event-->

    <form>
        <label for="key-input">Key</label>
        <input id="key-input" type="text"/>

        <label for="from-input" >from</label>
        <input id="from-input" type="datetime"/>
        
        <label for="to-input">to</label>
        <input id="to-input" type="datetime"/>
        
        <label for="text-input">text</label>
        <input id="text-input" type="text-area"/>
        
        <label for="retarget-input">retarget</label>
        <input id="retarget-input" type="checkbox"/>
    
    </form>

</div> 