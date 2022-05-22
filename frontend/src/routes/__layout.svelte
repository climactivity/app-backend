<script>
  import "../app.scss";
  import Header from "$lib/components/header/Header.svelte";
  import Searchbar from "$lib/components/header/Searchbar.svelte";
</script>

<!--navigation here-->

<main class=" flex h-screen bg-gray-100 font-sans">
  <nav class="fixed">
    <Header />
  </nav>
  <content class=" flex-grow  content-start pl-40 pr-3 mt-10">
    <Searchbar />
    <slot />
  </content>
	
	<footer class="flex-col">
		<!-- TODO footer content-->

	</footer>
</main>

<style>

</style>
