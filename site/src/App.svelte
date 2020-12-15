<script lang="ts">
  import Infobytes from "./Infobytes/Infobytes.svelte";
  import {
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'sveltestrap';
 
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
      <NavLink disabled href="#">Health</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Analytics</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Logs</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Bäume</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Aspekte</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#" active>Infobytes</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Aufgaben</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Danger Zone</NavLink>
    </NavItem>
  </Nav>


  <Container>
    <Infobytes/>
  </Container>
</main>
