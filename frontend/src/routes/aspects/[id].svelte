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
    import AspectEdit from "$lib/components/Aspects/aspect-edit.svelte";
    export let data: Aspect;
</script>

<div>
    <AspectEdit bind:data/>
</div>
