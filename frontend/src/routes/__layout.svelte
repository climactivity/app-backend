<script>
  import "../app.scss";
</script>

<!--navigation here-->

<main class="grid grid-flow-col grid-cols-12 ">
<nav class="col-span-2 bg-zinc-200 relative">
  <ul class="grid grid-flow-row fixed">
    <a href="/quests" class="navlink">Aufgaben</a>
    <a href="/infobytes" class="navlink">Infobytes</a>
    <a href="/media" class="navlink">Medien</a>
    <a href="/aspects" class="navlink">Aspekte</a>
    <a href="/treetemplates" class="navlink">B&#xE4;ume</a>
    <a href="/analytics" class="navlink">Analytics</a>

    <a href="#" class="navlink">Abmelden</a>
  </ul>
</nav>
<content class="col-span-10">
  <slot />
</content>

<footer>
  <!-- TODO footer content-->
</footer>
</main>
<style lang="scss">
    .navlink {
      @apply text-base;
    }

</style>
