<script lang="ts">
  import Infobytes from "./Infobytes/Infobytes.svelte";
  import {
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'sveltestrap';
  import { Router, Link, Route } from "svelte-routing";
import { baseUrl } from "./stores";
import MyNavLink from "./MyNavLink.svelte";

let activeTab = "infobytes"

function setActiveTab(path) {
  return function (event) {
    console.log(path)
    activeTab = path
  };
}

</script>

<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>

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
    <NavItem>
      <MyNavLink  target={"health"} currentTab={activeTab} callback={setActiveTab}>Health</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"analytics"} currentTab={activeTab} callback={setActiveTab}>Analytics</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"logs"} currentTab={activeTab} callback={setActiveTab}>Logs</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"baeume"} currentTab={activeTab} callback={setActiveTab}>Bäume</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"aspects"} currentTab={activeTab} callback={setActiveTab}>Aspekte</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"infobytes"} currentTab={activeTab} callback={setActiveTab}>Infobytes</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"tasks"} currentTab={activeTab} callback={setActiveTab}>Aufgaben</MyNavLink>
    </NavItem>
    <NavItem>
      <MyNavLink  target={"danger-zone"} currentTab={activeTab} callback={setActiveTab}>Danger Zone</MyNavLink>
    </NavItem>
  </Nav>


  <Container>
    {#if activeTab === ''}
      <h1> start page </h1>
    {:else if activeTab === "baeume" }
      <h1> Baum Template Editor </h1>
    {:else if activeTab === "infobytes" }
      <Infobytes/>
    {/if}
  </Container>
</main>
