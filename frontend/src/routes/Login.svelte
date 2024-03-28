<script>
  import { replace } from 'svelte-spa-router';
  import ThemeSelect from "../components/global/ThemeSelect.svelte";
  import LoginForm from "../components/login/LoginForm.svelte";
  import SignupForm from "../components/login/SignupForm.svelte";

  if(localStorage.getItem('user')) replace('/home');

  let showLogin = true;
  const handleFormSwitch = () => {
    showLogin = !showLogin;
  };
</script>

<div>
  <header class="flex justify-center items-center mt-10 w-full">
    <h1 class="text-[5rem] font-mserrat text-center text-primary">
      Babel Chat
    </h1>
    <svg
      class="h-24 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path
        d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"
      ></path></svg
    >
    <div class="absolute right-20">
      <ThemeSelect size={"16"} />
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
