<script>
  import { userData } from '../store';
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';

  let userInfo = JSON.parse(localStorage.getItem('user'));

</script>

<div>
  <div class='flex w-full font-inter'>
    <div class='w-1/5 min-h-screen bg-secondary-content'>
      <header class='h-20 flex items-center gap-6'>
        <Profile moniker={userInfo.username[0].toUpperCase()} status={'online'} />
        <h2 class='text-2xl'>{userInfo.username}</h2>
      </header>
      <div class='w-[6.75rem] h-5/6 border-r-4 border-r-neutral mt-5'>

      </div>
    </div>
    <div class='w-4/5'>
      <header class='h-20 border-b-4 border-neutral mx-5 flex items-center'>
        <h2 class='text-3xl'>Room #Name</h2>
        <h3 class='text-center grow'>Members 0nline 22</h3>
        <div class='ml-auto'>
          <ThemeSelect size={10} />
        </div>
      </header>
    </div>
  </div>
</div>

<style>
</style>
