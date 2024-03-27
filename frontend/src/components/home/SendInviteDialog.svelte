<script>

  export let inviteCode = '';
  export let inviteUser = '';
  export let inviteRoom = '';
  export let socketNotify;
  let { username } = JSON.parse(localStorage.getItem('user'));
  let greeting = `${username} invites you to join them in a private chat`;
  
  $: inviteText = `${greeting}\nRoom: ${inviteRoom}\nCode: ${inviteCode}`
  
  const handleSendInvite= () => {
    socketNotify.emit('send notification', { username: inviteUser, text: inviteText })
  };
</script>

<dialog id="send_invite_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-2">Insert room name in the input below</h3>
    <input 
      type="text"
      placeholder="Username"
      class="input input-bordered input-primary input-sm w-full max-w-xs grow"
      bind:value={inviteUser}
    />
    <h3 class="font-bold text-md mt-5 mb-2">Greeting (optional)</h3>
    <input
      type="text"
      bind:value={greeting}
      class="input input-bordered input-primary input-sm w-full max-w-xs grow"
    />
    <p class="mb-1 mt-5 font-bold">Message Preview</p>
    <pre class="text-sm text-secondary">{inviteText}</pre>
    <button
    class="btn btn-primary btn-sm text-lg mt-5"
    on:click={handleSendInvite}
    >
    send
  </button>
    <p class="py-4 text-sm text-warning">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
