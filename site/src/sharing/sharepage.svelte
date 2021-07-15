<script lang="ts">
    import InfobitDisplay from "./InfobitDisplay.svelte";
    import Meta from "svelte-meta";

    export let infobyte;
    export let index;
    const url = `${window.location.origin}/sharing/${infobyte}/${index}`;
    const infobyteContent = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());


    import { Pulse } from "svelte-loading-spinners";
    import Footer from "../Footer.svelte"
    import CTA from "../Cta.svelte"
</script>

<Meta
    title="Climactivity"
    description="gemeinsam zum klimaziel"
    image="/img/logo.png"
    url="https://app.climactivity.de"
/>

<container class="wrapper">
    <div class="content">
        <div class="infobit">
            <article>
                {#await infobyteContent}
                <div style="dislplay:flex; alignItems:center; justifyContent:center;">
                    <Pulse size="60" color="#93C11F" unit="px" duration="1s" />
                </div>
                {:then data}
                    {#if data.statusCode == 400}
                        <span>{data.message}</span>
                    {:else}
                        <h1>{data.title}</h1>
                        <InfobitDisplay infobit={data} />
                    {/if}
                {:catch errors}
                    <span>{errors.message}</span>
                {/await}
            </article>
        </div>
        <CTA/>
    </div>
    <Footer/>
</container>

<style lang="css">
    * {
        font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Helvetica Neue", Arial, sans-serif;
        line-height: 1.618;
        text-rendering: optimizeLegibility;
        margin: 0;
        padding: 0;
    }
    .wrapper {
        display: flex;
        flex-grow: 1;
        margin: auto 0;
        flex-direction: column;
        min-height: 95vh;
        align-items: center;
    }
    article {
        padding: 2rem;
        margin: 2rem;
    }
    .content {
        max-width: 1140px;
    }
    .section-break {
        overflow: hidden;
        position: relative;
        left: 0;
        width: 100%;
        line-height: 0;
        direction: ltr;
        z-index: -10;
        max-width: 100% !important;
        background-color: #edf4d9;
    }
    .shape {
        display: block;
        width: calc(100% + 1.3px);
        position: relative;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .shape-fill {
        fill: rgb(255, 255, 255);
        -webkit-transform-origin: center;
        -ms-transform-origin: center;
        transform-origin: center;
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
</style>
