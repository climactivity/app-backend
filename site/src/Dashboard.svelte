<script lang="ts">
    import { onMount } from "svelte";
    import {
        Collapse,
        Container,
        Nav,
        Navbar,
        NavbarBrand,
        NavbarToggler,
        NavItem,
        NavLink,
    } from "sveltestrap";
    import AspectView from "./Aspects/AspectView.svelte";
    import InfobytePage from "./Infobytes/InfobytePage.svelte";
    import MyNavLink from "./MyNavLink.svelte";
    import TreeTemplateView from "./TreeTemplates/TreeTemplateView.svelte";

    let tabs = [
        { target: "health", name: "Health", disabled: true },
        { target: "analytics", name: "Analytics", disabled: true },
        { target: "logs", name: "Logs", disabled: true },
        { target: "baeume", name: "Bäume" },
        { target: "aspects", name: "Aspekte" },
        { target: "infobytes", name: "Infobytes" },
        { target: "tasks", name: "Aufgaben", disabled: true },
        { target: "danger-zone", name: "Danger Zone", disabled: true },
    ];

    let activeTab = "infobytes";

    function setActiveTab(path) {
        path = path.split("#").pop();
        if (!tabs.some((e) => e.target === path)) {
            console.log("Path ", path, " not defined!");
            return;
        }
        return function () {
            console.log(path);
            activeTab = path;
            window.location.hash = path;
        };
    }

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

    onMount(async () => {
        console.log("Dashboard mounted!");
        setActiveTab(window.location.hash)();
    });
</script>

<main>
    <Navbar color="light" light expand="xl">
        <NavbarToggler on:click={() => (isOpen = !isOpen)} />

        <NavbarBrand href="/">
            <img
                src="/img/logo.png"
                height="30"
                class="d-inline-block align-top"
                alt="CyLogo"
            />
        </NavbarBrand>

        <Collapse {isOpen} navbar expand="xl" on:update={handleUpdate}>
            <Nav>
                {#each tabs as tab}
                    <NavItem>
                        <MyNavLink
                            name={tab.name}
                            target={tab.target}
                            currentTab={activeTab}
                            callback={setActiveTab}
                            disabled={tab.disabled}>{tab.name}</MyNavLink
                        >
                    </NavItem>
                {/each}
            </Nav>
        </Collapse>
        <NavItem>
            <NavLink>Abmelden</NavLink>
        </NavItem>
    </Navbar>
    <Container>
        {#if activeTab === ""}
            <h1>start page</h1>
        {:else if activeTab === "baeume"}
            <TreeTemplateView />
        {:else if activeTab === "aspects"}
            <AspectView />
        {:else if activeTab === "infobytes"}
            <InfobytePage />
        {/if}
    </Container>
</main>

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
