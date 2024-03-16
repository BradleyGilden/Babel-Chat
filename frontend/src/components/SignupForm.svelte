<script>
// @ts-nocheck

  import axios from "axios";
  // @ts-nocheck
    let showPassword = false
    let disabled = true;
    let password = '';
    let username = '';
    let email = '';
    let validPassword = true;
    let validUsername = true;
    let initialized = false;
    let isLoading = false;
  
    $: {
      if (initialized) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password)) {
          validPassword = true;
        } else {
          validPassword = false;
        }
        if (username.length > 4) {
          validUsername = true;
        } else {
          validUsername = false;
        }
        if (validPassword && validUsername && email.length > 3) {
          disabled = false;
        } else {
          disabled = true;
        }
      } else {
        initialized = true
      }
    };

    const handleSubmit = async () => {
      isLoading = true;
      const signFormSwitch = document.getElementById('signFormSwitch');
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        username,
        email,
        password
      });
      console.log(response);
      isLoading = false;
      signFormSwitch.click();
    }
  </script>
  
  <div class='w-1/2 mt-16 mx-auto'>
    <form on:submit|preventDefault={handleSubmit} class='flex flex-col w-3/5 gap-y-10 mx-auto'>
      <div>
        {#if !validUsername}
        <p class='pl-2 text-warning mb-1'>Username must be atleast 4 characters long</p>
        {/if}
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" class="grow" placeholder="Username" bind:value={username} />
        </label>
      </div>

      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="text" class="grow" placeholder="Email" bind:value={email}/>
      </label>

      <div>
        {#if !validPassword}
        <p class='pl-2 text-warning mb-1'>Password must be 8-16 characters long, with atleast one Uppercase, Lowercase and digit</p>
        {/if}
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
          <input type={!showPassword ? "password": "text"} class="grow" on:input={(e) => {password = e.target.value}} />
          <button type="button" class="w-5" on:click={() => {showPassword = !showPassword}}>
            {#if !showPassword}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.1305 15.8421L9.34268 18.7821L7.41083 18.2645L8.1983 15.3256C7.00919 14.8876 5.91661 14.2501 4.96116 13.4536L2.80783 15.6069L1.39362 14.1927L3.54695 12.0394C2.35581 10.6105 1.52014 8.8749 1.17578 6.96843L2.07634 6.80469C4.86882 8.81573 8.29618 10.0003 12.0002 10.0003C15.7043 10.0003 19.1316 8.81573 21.9241 6.80469L22.8247 6.96843C22.4803 8.8749 21.6446 10.6105 20.4535 12.0394L22.6068 14.1927L21.1926 15.6069L19.0393 13.4536C18.0838 14.2501 16.9912 14.8876 15.8021 15.3256L16.5896 18.2645L14.6578 18.7821L13.87 15.8421C13.2623 15.9461 12.6376 16.0003 12.0002 16.0003C11.3629 16.0003 10.7381 15.9461 10.1305 15.8421Z"></path></svg>
            {/if}
          </button>
        </label>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <p class="text-end">Already a member? <span id='signFormSwitch' class="text-primary hover:cursor-pointer" on:click>Login</span></p>

      <button type="submit" disabled={disabled} class='btn btn-primary text-bg text-xl w-fit ml-auto'>
        {#if isLoading}
        <span class="loading loading-spinner"></span>
        {/if}
        Signup
      </button>
    </form>
  </div>
  
  <style>
  </style>
