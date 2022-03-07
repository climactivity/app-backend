<script lang="ts">
    import type { EventMessage } from "./RemoteConfigTypes";
    import  EventMessages from "./EventMessages.svelte";

    import { onMount } from "svelte";
    import { baseUrl, isProd } from "../stores";
    let serverConfig = null 
    onMount(async () => {
        serverConfig = await (
            await fetch(`${baseUrl}config`, {
                credentials: "include",
            })
        ).json();  
    });
    
    </script>
    
    
    <div>
        {#if serverConfig }
         <EventMessages serverConfig={serverConfig}></EventMessages>

        {/if}
        
    
    </div> 