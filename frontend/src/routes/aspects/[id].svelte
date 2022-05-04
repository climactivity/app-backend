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
    import ContentEditorActions from "$lib/components/Editor/content-editor-actions.svelte";
    export let data: Content;
</script>

<div>
    {#if data}
        <ContentEditorActions bind:data />
        <div>
            <StringEdit
                label="Name"
                type="string"
                placeholder="Name"
                value={data.name}
                name="name"
            />
            <StringEdit
                label="Titel"
                type="string"
                placeholder="Titel der in der App angezeigt wird"
                value={data.title}
                name="title"
            />
        </div>

        <ContentDebug {data} />
    {/if}
</div>
