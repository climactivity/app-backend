<script lang="ts" context="module">
	import { page } from "$app/stores";
	import type { QuestDto } from "$lib/components/Quests/QuestTypes";
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
	import { fade } from 'svelte/transition';
	import {
		goto,
	} from "$app/navigation";

	export let data;

	let showToast = false;

	const flashToast = (duration) => {
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, duration);
	};

	const deleteQuest = async () => {
		let isDelet = confirm(
			`Bist du Sicher? beim löschen dieser Aufgabe:  ${data.title}`,
		);

		if (data._id && isDelet) {
			const response = await fetch(
				`${baseUrl}quest-management${data._id ? "/" + data._id : ""}`,
				{
					credentials: "include",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				console.log(response);
				alert("It not deleted");
				return;
			}

			console.log("die Aufgabe ist gelöscht");

			flashToast(500);
			setTimeout(() => {
				const relativeBase = $page.routeId.split("/")[0];
				goto(`/${relativeBase}/`, {
					replaceState: false,
				});
			}, 500);

		}
	};
</script>

{#if data}

		<!-- Toaster -->
	<div transition:fade
		class="{showToast
			? 'p-3 mb-3 absolute top-2 right-2'
			: 'hidden'} flex w-90 max-w-sm mx-auto overflow-hidden bg-slate-100 rounded-lg shadow-md dark:bg-gray-800 opacity-90"
	>
		<div class="flex items-center justify-center w-8 bg-red-500">
			<svg
				class="w-6 h-6 text-white fill-current"
				viewBox="0 0 40 40"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
				/>
			</svg>
		</div>

		<div class="px-4 py-2 -mx-3">
			<div class="mx-3">
				<span class="font-semibold text-red-500 dark:text-emerald-400"
					>Deleted</span
				>
				<p class="text-sm text-gray-600 dark:text-gray-200">
					Aufgabe gelöscht!
				</p>
			</div>
		</div>
	</div>


	<div class="flex justify-between border-2 rounded-lg m-1 p-1">
		<div>
			<h1 class="text-2xl text-center">{data?.title}</h1>
			<p class=" text-sm text-gray-500 dark:text-gray-400 ">
				Created Date: {data.createdAt.slice(0, 10)}, Last Modified: {data.updatedAt.slice(
					0,
					10,
				)}
			</p>
		</div>

		<div class="flex flex-col text-2xl text-center">
			<a class="inline-block px-6 py-2.5 mb-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out" href="/quests/edit/{data._id}">Edit</a>
			<button class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" on:click={deleteQuest}>Delete</button>
		</div>
	</div>
	<div class="border-2 rounded-lg p-2 m-1">
		<div  class="mb-2 border-b border-gray-300" >Sprache <span>: {data.language}</span></div>
		<div  class="mb-2 border-b border-gray-300"  >Region <span> : {data.region}</span>
		</div>
		<div  class=" mb-2 border-b border-gray-300">Beschreibung:
			{data?.text?.doc?.content[0]?.content[0]?.text
				? data?.text?.doc?.content[0]?.content[0]?.text
				: ""}
		</div>
		<div  class="mb-2 border-b border-gray-300">Link nachdem fertig :
			{data?.linkToAfter ? data?.linkToAfter : ""}
		</div>
		<div class="mb-2 border-b border-gray-300">
			{data.triggerTrackingUpdate ? data.triggerTrackingUpdate : ""}Tracking
			abfragen nachdem Aufgabe bearbeit?
		</div>
		<div class="mb-2 border-b border-gray-300">
			Start Date : {data.startDate ? data.startDate : ""}
		</div>
		<div class="mb-2 border-b border-gray-300">
			Deadline: {data.deadline ? data.deadline : ""}
		</div>
		<div class="mb-2 border-b border-gray-300">
			maximale Dauer (in Stunden) : {data.maxDuration ? data.maxDuration : ""}
		</div>
		<div class="mb-2 border-b border-gray-300">
			Wiederholen nach (in Stunden): {data.repeatAfter ? data.repeatAfter : ""}
		</div>
		<div class="mb-2 border-b border-gray-300">
			Wiederholen: {data.numRepeat ? data.numRepeat : ""}
		</div>
	</div>
{:else}
	<h1>loading..</h1>
{/if}

<style>
</style>