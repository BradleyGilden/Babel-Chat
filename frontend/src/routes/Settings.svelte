<script>
  // @ts-nocheck

  import axios from "axios";
  import { push } from "svelte-spa-router";
  import Swal from "sweetalert2";
  import ThemeSelect from "../components/global/ThemeSelect.svelte";
  import Profile from "../components/global/Profile.svelte";

  const API_URL = import.meta.env.VITE_API_URL;
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let { username, id } = userInfo;
  let password = "";
  let disabled = true,
    udisabled = true,
    pdisabled = true;

  let viewPassword = false;
  let validPassword = true;
  let validUsername = true;
  let initialized = false;
  let saveLoading = false;
  let logoutLoading = false;

  $: {
    if (initialized) {
      if (pdisabled) {
        validPassword = true;
      } else if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password)
      ) {
        validPassword = true;
      } else {
        validPassword = false;
      }
      if (username.length > 4) {
        validUsername = true;
      } else {
        validUsername = false;
      }
      if ((validPassword && !pdisabled) || (validUsername && !udisabled)) {
        disabled = false;
      } else {
        disabled = true;
      }
    } else {
      initialized = true;
    }
  }

  const handleLogout = async () => {
    logoutLoading = true;
    localStorage.removeItem("user");
    localStorage.removeItem("currentRoom");
    localStorage.removeItem("currentNameSpace");
    logoutLoading = false;
    await push("/");
  };

  const saveSettings = async () => {
    saveLoading = true;
    try {
      if (!pdisabled && !udisabled) {
        pdisabled = true;
        udisabled = true;
        await axios.post(`${API_URL}/api/user/update`, {
          uid: id,
          fields: { password, oldname: userInfo.username, newname: username },
        });
        localStorage.setItem("user", JSON.stringify({ ...userInfo, username }));
        userInfo = { ...userInfo, username };
        pdisabled = false;
        udisabled = false;
      } else if (!udisabled) {
        udisabled = true;
        await axios.post(`${API_URL}/api/user/update`, {
          uid: id,
          fields: { oldname: userInfo.username, newname: username },
        });
        localStorage.setItem("user", JSON.stringify({ ...userInfo, username }));
        userInfo = { ...userInfo, username };
        udisabled = false;
      } else if (!pdisabled) {
        pdisabled = true;
        await axios.post(`${API_URL}/api/user/update`, {
          uid: id,
          fields: { password },
        });
        pdisabled = false;
      }
    } catch (err) {
      saveLoading = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data.message,
      });
    }
    saveLoading = false;
  };
</script>

<div>
  <header class="h-20 flex items-center w-[90%] justify-start mx-auto relative">
    <button
      class="btn text-warning h-5 w-[12rem] text-2xl bg-base-100 rounded-full"
      on:click={async () => {
        await push("/home");
      }}
    >
      <svg
        class="h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
          d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"
        ></path></svg
      >
      Go Back
    </button>
    <h1 class="text-[3rem] text-center grow mx-auto font-mserrat text-primary">
      Settings
    </h1>
    <div>
      <ThemeSelect size={"16"} />
    </div>
    <div class="absolute top-20 text-center w-[12rem] flex flex-col gap-y-2">
      <a
        href={`${API_URL}/docs`}
        target="_blank"
        rel="noreferrer"
        class="btn bg-base-100 text-2xl text-warning w-full border-warning border-2 rounded-full"
        >API Docs</a
      >
      <button
        class="btn btn-warning text-2xl w-full border-warning border-2 rounded-full"
        on:click={handleLogout}
      >
        {#if logoutLoading}
          <span class="loading loading-spinner"></span>
        {/if}
        Logout
      </button>
    </div>
  </header>

  <div class="w-[90%] mx-auto flex flex-col items-center mt-10 gap-5">
    <div class="ml-28">
      <Profile
        moniker={userInfo.username[0].toUpperCase()}
        status={"online"}
        width={"48"}
        fontSize={"[5rem]"}
      />
    </div>

    <div class="relative ml-28 px-[2.75rem]">
      {#if !validUsername}
        <p class="pl-2 text-error mb-1 max-w-md">
          Username must be atleast 4 characters long
        </p>
      {/if}
      <input
        type="text"
        placeholder="Username"
        class="input input-ghost w-full max-w-md text-2xl text-center bg-base-100 disabled:bg-base-100 px-10"
        bind:value={username}
        disabled={udisabled}
      />
      <button
        class="absolute right-0"
        on:click={() => {
          udisabled = !udisabled;
        }}
      >
        <kbd class="kbd kbd-3xl">✎</kbd>
      </button>
    </div>

    <div class="relative ml-28 px-[5.5rem]">
      {#if !validPassword}
        <p class="pl-2 text-error mb-1 max-w-md">
          Password must be 8-16 characters long, with atleast one Uppercase,
          Lowercase and digit
        </p>
      {/if}
      <input
        type={viewPassword ? "text" : "password"}
        placeholder="password"
        class="input input-ghost w-full max-w-md text-2xl text-center bg-base-100 disabled:bg-base-100 px-10"
        value={password}
        on:input={(e) => {
          password = e.target.value;
        }}
        disabled={pdisabled}
      />
      <button
        class="absolute right-10"
        on:click={() => {
          viewPassword = !viewPassword;
        }}
      >
        <kbd class="kbd kbd-3xl">👁️‍🗨️</kbd>
      </button>
      <button
        class="absolute right-0"
        on:click={() => {
          pdisabled = !pdisabled;
        }}
      >
        <kbd class="kbd kbd-3xl">✎</kbd>
      </button>
    </div>
    <button
      class="btn btn-primary w-48 ml-32 mt-10 text-lg"
      on:click={saveSettings}
      {disabled}
    >
      {#if saveLoading}
        <span class="loading loading-spinner"></span>
      {/if}
      Save
    </button>
  </div>
</div>
