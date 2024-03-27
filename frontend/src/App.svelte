<script>
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";

  const routes = {
    '/': Login,
    '/home': Home,
    '/settings': Settings
  }
</script>

<main>
  <Router { routes } />
</main>

<style>
</style>
