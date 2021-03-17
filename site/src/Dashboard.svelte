<script lang="ts">

    import Infobytes from "./Infobytes/Infobytes.svelte";
    import {
        Nav,
        NavItem,
        Container
    } from 'sveltestrap';
    import MyNavLink from "./MyNavLink.svelte";
    import TreeTemplateView from "./TreeTemplates/TreeTemplateView.svelte";
    import AspectView from "./Aspects/AspectView.svelte";

    let activeTab = "aspects"

    let tabs = [
        {target: "health", name: "Health"},
        {target: "analytics", name: "Analytics"},
        {target: "logs", name: "Logs"},
        {target: "baeume", name: "Bäume"},
        {target: "aspects", name: "Aspekte"},
        {target: "infobytes", name: "Infobytes"},
        {target: "tasks", name: "Aufgaben"},
        {target: "danger-zone", name: "Danger Zone"}
    ]

    function setActiveTab(path) {
        return function () {
            console.log(path)
            activeTab = path
        };
    }

</script>
<style>

    :global(:root) {
        --primary-light: #a6f9d6;
        --primary: #5be2a9;
        --primary-dark: #53ce9a;
        --secondary: #1e2145;
        --white: #fff;
        --grey: #e6e6ff;
        --grey-dark: #6d7098;
        --red: #ff6b6b;
        --red-dark: #9e3c3c;
    }

    main {
        margin: 0;
    }

    :global(button) {
        color: #fff;
        background-color: var(--primary);
        border: none;
        text-transform: uppercase;
        letter-spacing: 1.8px;
        outline: none;
        border-radius: 4px;
        display: block;
        margin-top: 12px;
        line-height: 1.8;
        font-size: 12px;
        padding: 10px 18px;
        min-width: 120px;
        transition: all 150ms ease;
        cursor: pointer;
        box-sizing: border-box;
    }

    :global(button:disabled) {
        background-color: var(--grey);
    }

    :global(button:focus:not(:disabled)) {
        box-shadow: 0 0 0 4px var(--primary-light);
    }

    :global(button:hover:not(:disabled)) {
        background-color: var(--primary-dark);
    }

    /* used for errors */
    :global(small) {
        display: block;
        font-size: 12px;
        color: var(--red);
        margin-top: 10px;
    }

</style>

<main>
    <Nav tabs justified>
        {#each tabs as tab}
            <NavItem>
                <MyNavLink target={tab.target} currentTab={activeTab} callback={setActiveTab}>{tab.name}</MyNavLink>
            </NavItem>
        {/each}
    </Nav>

    <Container>
        {#if activeTab === ''}
            <h1> start page </h1>
        {:else if activeTab === "baeume" }
            <TreeTemplateView/>
        {:else if activeTab === "aspects" }
            <AspectView/>
        {:else if activeTab === "infobytes" }
            <Infobytes/>
        {/if}
    </Container>
</main>
