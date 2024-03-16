<script>
// @ts-nocheck

  import ThemeSelect from "../components/ThemeSelect.svelte";
  import LoginForm from "../components/LoginForm.svelte";
  import SignupForm from "../components/SignupForm.svelte";

  let showLogin = true;
  const handleFormSwitch = () => {showLogin = !showLogin};
</script>

<div>
  <header class='flex justify-center items-center mt-10'>
    <h1 class='text-[5rem] font-mserrat text-center text-primary'>Babel Chat</h1>
    <div class='ml-10'>
      <ThemeSelect/>
    </div>
  </header>
  {#if showLogin}
  <LoginForm on:click={handleFormSwitch} />
  {:else}
  <SignupForm on:click={handleFormSwitch} />
  {/if}
</div>
<style>
</style>
