<script lang="ts">
    import Dashboard from "./Dashboard.svelte";
    import { Router, Route, Link } from "svelte-navigator";
    import {
        NotificationDisplay,
        notifier,
    } from "@beyonk/svelte-notifications";

    import { Container } from "sveltestrap";
    import Sharepage from "./sharing/sharepage.svelte";
    import Landing from "./Landing.svelte";
import LoggedOutNavbar from "./LoggedOutNavbar.svelte";
    $: path = location.pathname;
</script>

<main>
    <NotificationDisplay />
    <Router>
        <Route path="admin">
            <Dashboard />
        </Route>
        <Route path="s/:id/:index" let:params>
            <LoggedOutNavbar/>
            <Sharepage infobyte={params.id} index={params.index} />
        </Route>
        <Route path="/">
            <LoggedOutNavbar/>
            <Landing/>
        </Route>
    </Router>
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
