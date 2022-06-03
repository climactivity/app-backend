<script>
  import "../app.scss";
  import Header from "$lib/components/header/Header.svelte";
  import Searchbar from "$lib/components/header/Searchbar.svelte";
import Footer from "$lib/components/Footer.svelte";
</script>

<!--navigation here-->

<main class=" flex h-screen font-sans">
  <nav class="fixed">
    <Header />
  </nav>
  <div class=" flex-grow  content-start pl-40 pr-3 mt-10">
    <content class=" pl-40  mt-10">
      <Searchbar />
      <slot />
    </content>

    <footer class="absolute bottom-0 pl-40  flex-grow-1 ">
      <!-- TODO footer content-->
      <!-- <Footer/> -->
    </footer>
  </div>
</main>

<style>

</style>
