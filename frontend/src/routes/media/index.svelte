<script>
import { browser } from "$app/env";
import ContentTypeList from "$lib/components/Editor/content-type-list.svelte";
import MediaListItem from "$lib/components/Media/media-list-item.svelte";
import { baseUrl } from "$lib/stores/stores";

let offset = 0, limit = 20, query = ""

const fetchImages = async () => {
        const response = await fetch(
            `${baseUrl}image-upload?${new URLSearchParams({
                offset: offset + "",
                pageSize: limit + "",
                query: query
            })}`,
            {
                credentials: "include",
            }
        );
        return await response.json();
    };
    
</script>

<content class="p-2">
    <nav>
        {#if browser}
            <ContentTypeList
                ListElementComponent={MediaListItem}
                fetchContentMetaData={fetchImages}
                newPath="new"
                offset={offset}
                limit={limit}
                bind:searchQuery={query}
                listCols="1fr 1fr 1fr"
            />
        {/if}
    </nav>
</content>