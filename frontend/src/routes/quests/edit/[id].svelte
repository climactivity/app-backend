<script lang="ts" context="module">
	import { page } from "$app/stores";
   import type {QuestDto} from "$lib/components/Quests/QuestTypes";
	import { baseUrl } from "$lib/stores/stores";

	export async function load({ params, fetch, session, stuff }) {
		const response = await fetch(`${baseUrl}quest-management/${params.id}`, {
			credentials: "include",
		});
		return {
			status: response.status,
			props: {
				data: response.ok && (await response.json()),
			},
		};
	}
</script>

<script lang="ts">
	import EditQ from "$lib/components/Quests/editQuest.svelte";
	export let data;
</script>

<EditQ bind:data title="Aufgabe bearbeiten" />
