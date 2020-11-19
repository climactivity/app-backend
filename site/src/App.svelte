<script lang="ts">
  import Aside from './Aside.svelte';
  import InfobyteEditor from "./InfobyteEditor.svelte";

  export let name: string;

  export const selectInfoByteHandler = (infobyte) => {
    selectedInfobyte = infobyte;
  };
  export let selectedInfobyte = undefined;
  $: {
    testIsChanged(selectedInfobyte);
  }

  function testIsChanged(newValue) {
    console.log(newValue);
  }
	function handleMessage(event) {
		if(event.type == 'created') {
      console.log("new infobyte");
    }
	}

</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  section {
    float: right;
    width: 60vw;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Cool InfoByte Editor</h1>
  <Aside bind:selectedInfobyte />

  <section id="editor-container">

    <div>editor</div>
    <InfobyteEditor on:message={handleMessage}/>

    <div>
      <h3>selected infobyte</h3>
      {#if selectedInfobyte}{JSON.stringify(selectedInfobyte)}{/if}
    </div>
  </section>
</main>
