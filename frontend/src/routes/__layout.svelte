<script>
  import "../app.scss";
  import Header from "$lib/components/header/Header.svelte";
  import Searchbar from "$lib/components/header/Searchbar.svelte";
import Footer from "$lib/components/Footer.svelte";
</script>

<!--navigation here-->

<main class=" flex h-screen font-sans">
  <nav class="fixed ">
    <Header />
  </nav>
  <div class=" flex-grow pl-20 content-start md:pl-32 pr-3 mt-0">
    <content class="">
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
