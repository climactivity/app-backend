<script lang="ts">
    import type { LocalizedFactor } from "./AspectTypes";
    import { flip } from "svelte/animate";
import StringEdit from "../Editor/string-edit.svelte";
import YesNoDialog from "../YesNoDialog.svelte";

    export let value: LocalizedFactor[];
    let hovering: boolean | number = false;

    const drop = (event: DragEvent, target) => {
        event.dataTransfer.dropEffect = "move";
        const start = parseInt(event.dataTransfer.getData("text/plain"));
        const newTracklist = value;

        if (start < target) {
            newTracklist.splice(target + 1, 0, newTracklist[start]);
            newTracklist.splice(start, 1);
        } else {
            newTracklist.splice(target, 0, newTracklist[start]);
            newTracklist.splice(start + 1, 1);
        }
        newTracklist.forEach((f, i) => (f.id = i));
        value = newTracklist;
        hovering = null;
    };

    const dragstart = (event, i) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        const start = i;
        event.dataTransfer.setData("text/plain", start);
    };

    const addFactor = (event) => {
        value = [...value, {id: value.length, intro: "", name: "", editing: true}]
    }
</script>

<div class="shadow-md rounded-sm bg-white">
    {#each value as f, index (f.name)}
        <div
            class="list-item"
            animate:flip
            draggable={true}
            on:dragstart={(event) => dragstart(event, index)}
            on:drop|preventDefault={(event) => drop(event, index)}
            ondragover="return false"
            on:dragenter={() => (hovering = index)}
            class:important={hovering === index}
        >
            <div>
                {f.id}
            </div>
            {#if f.editing}
            <div>
                <StringEdit bind:value={f.name} id="name" placeholder="Name" type="textarea" rows="5" class="w-full"/>
            </div>
            <div>
                <StringEdit bind:value={f.intro} id="intro" placeholder="intro" type="textarea" rows="5" class="w-full"/>
            </div>

            <div class="grid place-content-center">
                <YesNoDialog let:confirm="{confirm}" onConfirm={() => value = value.filter((e) => e.id!==f.id)}>
                    <button class="" on:click|preventDefault={(event) => {
                        confirm();
                    }}>💣</button>
                </YesNoDialog>
            </div>

            <div class="grid place-content-center">
                <button class="" on:click|preventDefault={(event) => {
                    value.forEach((e, j) => {
                        delete e.editing;
                    });
                    value[index].editing = false
                }}>✔</button>
            </div>

            {:else}
            <div>
                {f.name}
            </div>
            <div>
                {f.intro}
            </div>

            <div class="grid place-content-center">
                <button class="" on:click|preventDefault={(event) => {
                    value.forEach((e) => {
                        delete e.editing;
                    });
                    value[index].editing = true
                }}>✏</button>
            </div>
            {/if}

        </div>
    {/each}
    <button on:click={addFactor}>+</button>
</div>

<style lang="scss">
    .list-item {
        grid-template-columns: 1fr 3fr 8fr 1fr;
        @apply py-2 px-4 border-b-[1px] border-solid border-zinc-200 grid grid-flow-col;
    }

    .list-item,::not(:last-child) {
        @apply border-0
    }
    .list-item > * {
        @apply mx-2 px-2
    }
</style>
