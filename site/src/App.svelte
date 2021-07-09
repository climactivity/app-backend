<script lang="ts">
    import Dashboard from "./Dashboard.svelte";
    import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'

    import {
        Col,
        Container,
        Row,
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from "sveltestrap";
    $: path = location.pathname;
    let isOpen = false;

function handleUpdate(event) {
  isOpen = event.detail.isOpen;
}
</script>

<main>
    <NotificationDisplay />

    {#if path === "/admin/"}
        <Dashboard />
    {:else}
    <Navbar color="light" light expand='lg'>
        <NavbarBrand href="/">
            <img src="/img/logo.png" height="30" class="d-inline-block align-top" alt="CyLogo">
        </NavbarBrand>
        <NavbarToggler on:click={() => (isOpen = !isOpen)} />
        <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
            <Nav class="ml-auto" navbar pills>
                <NavItem>
                    <NavLink href="/admin/">Admin-Bereich</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        href="https://github.com/climactivity"
                        >GitHub</NavLink
                    >
                </NavItem>
            </Nav>
        </Collapse>

    </Navbar>
    <Container>
 

        <h1>TODO: Landing page für die App bauen</h1>
    </Container>
    {/if}
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
