<script>
  import "../app.scss";
</script>


<!--navigation here-->
<main class="layout bg-zinc-200">

  <div class="header important shadow-md align-middle flex flex-row place-content-between">
      <h1 class="text-2xl my-auto ml-2">Cy CMS v2.0</h1>
  </div>

  <nav class="nav bg-zinc-200 pt-2">
    <ul class="grid grid-flow-row fixed ml-2 space-y-2">
      <a href="/quests" class="navlink">Aufgaben</a>
      <a href="/infobytes" class="navlink">Infobytes</a>
      <a href="/media" class="navlink">Medien</a>
      <a href="/aspects" class="navlink">Aspekte</a>
      <a href="/treetemplates" class="navlink">B&#xE4;ume</a>
      <a href="/analytics" class="navlink">Analytics</a>
      <a href="#" class="navlink">Abmelden</a>
      <hr class="border-2 border-white rounded-full">
      <a href="https://nk.climactivity.de" class="navlink">Server Status</a>
    </ul>
  </nav>

  <content class="content overflow-scroll">
    <slot />
  </content>

  <footer class="footer">
    <!-- TODO footer content-->
    <span>cool</span>
  </footer>
</main>

<style lang="scss">
  .navlink {
    @apply text-zinc-700;
  }

  .navlink:hover {
    @apply text-zinc-400;
  }
  .layout {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows: 50px 1fr 30px;
    grid-template-columns: 150px 1fr;

    grid-template-areas:
      "header header"
      "nav    main"
      "footer footer";

  }

  .header {
    grid-area: header;
  }

  .nav {
    grid-area: nav;
  }

  .content {
    grid-area: main;
  }

  .footer {
    grid-area: footer;
  }
</style>
