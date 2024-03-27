<script>
// @ts-nocheck

  export let currentNameSpace;
</script>

<div class='w-[6.75rem] max-h-screen border-r-4 border-r-neutral mt-5 flex flex-col items-center gap-y-10'>
  <button
  id="globalNamespace"
  data-ns="/"
  class={ currentNameSpace === '/' && "bg-primary rounded-xl text-secondary-content" }
  on:click={(e) => { currentNameSpace = document.getElementById("globalNamespace").dataset.ns } }
  >
    <div class="avatar global">
      <div class="w-16 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0003 21H18.0003V23H6.00032V21H11.0003V19.9506C7.70689 19.6236 4.88351 17.6987 3.31641 14.9622L5.05319 13.9697C6.43208 16.3776 9.02674 18 12.0003 18C16.4186 18 20.0003 14.4182 20.0003 9.99995C20.0003 7.02637 18.378 4.43171 15.9701 3.05282L16.9626 1.31604C19.9724 3.03965 22.0003 6.28297 22.0003 9.99995C22.0003 15.1853 18.0536 19.4489 13.0003 19.9506V21ZM12.0003 17C8.13433 17 5.00032 13.8659 5.00032 9.99995C5.00032 6.13396 8.13433 2.99995 12.0003 2.99995C15.8663 2.99995 19.0003 6.13396 19.0003 9.99995C19.0003 13.8659 15.8663 17 12.0003 17Z"></path></svg>
      </div>
    </div>
  </button>
  <button
  id="privateNamespace"
  data-ns="/private"
  class={ currentNameSpace === '/private' && "bg-primary rounded-xl text-secondary-content" }
  on:click={(e) => { currentNameSpace = document.getElementById("privateNamespace").dataset.ns } }
  >
    <div class="avatar">
      <div class="w-16 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>
      </div>
    </div>
  </button>
  <button
  id="notifyNamespace"
  data-ns="/notify"
  class={ currentNameSpace === '/notify' && "bg-primary rounded-xl text-secondary-content" }
  on:click={(e) => { currentNameSpace = document.getElementById("notifyNamespace").dataset.ns } }
  >
    <div class="avatar">
      <div class="w-16 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
      </div>
    </div>
  </button>
</div>
