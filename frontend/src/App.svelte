<script>
  import Router from "svelte-spa-router";
  import Login from "./routes/Login.svelte";
  import Home from "./routes/Home.svelte";

  const routes = {
    '/': Login,
    '/home': Home,
  }
</script>

<main>
  <Router { routes } />
</main>

<style>
</style>
