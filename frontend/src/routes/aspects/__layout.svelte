<script lang="ts">
    import { browser } from "$app/env";
    import { baseUrl } from "$lib/stores/stores";
    import ContentTypeList from "$lib/components/Editor/content-type-list.svelte";

    import type Aspect from "$lib/components/Aspects/AspectTypes";
    import AspectListCard from "$lib/components/Aspects/aspect-list-card.svelte";

    export const getAspects: () => Promise<Aspect[]> = async () => {
        const response = await fetch(`${baseUrl}localized-aspect`, {
            credentials: "include",
        });
        return (await response.json()) as Promise<Aspect[]>;
    };

    const fetchAspectList = async (offset, limit) => {
        return getAspects();
    };
</script>

<content class="grid grid-flow-col grid-cols-9">
    <nav class="col-span-2">
    {#if browser}
        <ContentTypeList
            ListElementComponent={AspectListCard}
            fetchContentMetaData={fetchAspectList}
            offset={0}
            limit={10}
        />
    {/if}
    </nav>
    <main class="col-span-7 px-2">
        <slot />
    </main>
</content>
