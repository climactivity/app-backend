<script lang="ts" context="module">
    import { page } from "$app/stores";
    import type Aspect from "$lib/components/Aspects/AspectTypes";
    import { baseUrl } from "$lib/stores/stores";

    export async function load({ params, fetch, session, stuff }) {
        const response = await fetch(
            `${baseUrl}localized-aspect/${params.id}`,
            {
                credentials: "include",
            }
        );
        return {
            status: response.status,
            props: {
                data: response.ok && (await response.json()),
            },
        };
    }
</script>

<script lang="ts">
    import ContentDebug from "$lib/components/Editor/content-debug.svelte";
import ContentEditor from "$lib/components/Editor/content-editor.svelte";   
    import type { Content } from "$lib/components/Editor/editor-types";
    import StringEdit from "$lib/components/Editor/StringEdit.svelte";
    export let data: Content;
</script>

<div>

    {#if data} 
        <ContentEditor 
            bind:data={data}
            extractor={{
                name: {
                    component: StringEdit,
                    type: "string",
                    label: "Name",
                    placeholder: "Name",
                    name: "name"
                },

                title: {
                    component: StringEdit,
                    type: "string",
                    label: "Titel",
                    placeholder: "Titel der in der App angezeigt wird",
                    name: "title"
                },

            }}
        />


        <ContentEditor 
        bind:data={data}
        extractor={{
            name: {
                component: StringEdit,
                type: "string",
                label: "Name",
                placeholder: "Name",
                name: "name"
            },

            title: {
                component: StringEdit,
                type: "string",
                label: "Titel",
                placeholder: "Titel der in der App angezeigt wird",
                name: "title"
            },

        }}
    />



        <ContentDebug data={data}/>
    {/if}
</div>
