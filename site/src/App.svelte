<script lang="ts">
	import Aside from './Aside.svelte'
	import { onMount } from 'svelte';
	import EditorJS from '@editorjs/editorjs'; 
	import Header from '@editorjs/header'; 
	import List from '@editorjs/list'; 

	onMount(async () => {

		let editor = new EditorJS({
			holder: 'editorjs', 
  
			/** 
			 * Available Tools list. 
			 * Pass Tool's class or Settings object for each Tool you want to use 
			 */ 
			tools: { 
				header: Header, 
				list: List
			}, 

			placeholder: 'Let`s write an awesome story3!'

		});
	});
	export let name: string;
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
	  float:right;
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
	<Aside></Aside>

	<section id="editor-container">

		<div id="editorjs" />
	</section>
</main>
