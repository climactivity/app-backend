<script lang="ts">
import { browser } from "$app/env";
import { baseUrl } from "$lib/stores/stores";
import ContentTypeList from "$lib/components/Editor/content-type-list.svelte";

import type Aspect from "$lib/components/Aspects/AspectTypes";
import AspectListCard from "$lib/components/Aspects/aspect-list-card.svelte";


export const getAspects : () => Promise<Aspect[]> = async () => {
    const response = await fetch(`${baseUrl}localized-aspect`, {
        credentials: "include"
    }); 
    return await response.json() as Promise<Aspect[]>
}


const fetchAspectList = async(offset, limit) => {
    let aspects = await getAspects();
    return {
        data: aspects,
        count: aspects.length
    }


}

</script>

<content class="p-2">
    <nav >
    {#if browser}
        <ContentTypeList
            ListElementComponent={AspectListCard}
            fetchContentMetaData={fetchAspectList}
            newPath='new'
            offset={0}
            limit={10}
        />
    {/if}
    </nav>
</content>
