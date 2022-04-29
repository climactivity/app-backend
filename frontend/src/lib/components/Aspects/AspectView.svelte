<script lang="ts">
    import AspectList from "./AspectList.svelte";
    import AspectItem from "./AspectItem.svelte";
    import {mockAspects} from "./mockData";
    import {writable} from "svelte/store";
    import {dropAspect, getAspects} from "./AspectData"; 
import { onMount } from 'svelte';

    const selectedAspect = writable(null);
    const aspects = writable([]);

    async function handleDelete(event) {
        $aspects = $aspects.filter(a => a.name !== event.detail.aspect?.name);
        if (event.detail.aspect?._id) {
            dropAspect(event.detail.aspect).then(() => updateAspects())
        }
    }

    async function handleAdd(event) {
        updateAspects()
    }

    onMount( async () => {
        $aspects = await getAspects()
    })

    async function updateAspects() {
        console.log("reloading aspect list")
        $aspects = await getAspects()
    }
</script>

<section>
    <div>
        <div>
            <AspectList bind:aspects={$aspects} bind:selectedAspect={$selectedAspect}/>
        </div>
        <div>
            <!-- <AspectItem aspect={$selectedAspect} on:deleteAspect={handleDelete} on:addAspect={handleAdd}/> -->
        </div>
    </div>
</section>