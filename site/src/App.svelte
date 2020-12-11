<script lang="ts">
  import Aside from './Aside.svelte';
  import InfobyteEditor from "./InfobyteEditor.svelte";
  import { currentInfobyte,baseUrl } from './stores';

  let selectedInfobyte = undefined

  const unsubscribe = currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });
  const isProd = __frontend_env.env.isProd
  const apiUrl = __frontend_env.env.SVELTE_APP_API_HOST_BASE || ''

  if(isProd) {
    base_url = apiUrl 
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

  * {
    margin: 0;
    padding: 0;
  }

  main {
    margin: 0;
  }

  h1 {
    color: var(--red);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }

  .padded {
    margin: 1em 1em 0 30vw;
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
  <h4>{isProd} - {apiUrl}</h4>
  <Aside/>
  <section>

  <section id="editor-container">

    <div  class="padded">
    <InfobyteEditor bind:selectedInfobyte={selectedInfobyte} />
    </div>

  </section>
</section>
</main>
