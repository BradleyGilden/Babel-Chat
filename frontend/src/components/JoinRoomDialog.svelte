<script>
  // Dialog Box for the create room button
  let addNewRoomName = '';
  let loadingNewRoom = false;
  let passcode = '';

</script>

<dialog id="join_room_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Insert room name in the input below</h3>
    <div class="w-full mt-3 flex flex-col gap-4">
      <input 
      type="text"
      placeholder="Room Name"
      class="input input-bordered input-primary input-sm w-full max-w-xs grow"
      bind:value={addNewRoomName}
      />
      <div>
        <p class="font-bold mb-2">Pass Code</p>
        <input 
        type="password"
        placeholder="Password"
        class="input input-bordered input-primary input-sm w-full max-w-[10rem] grow"
        bind:value={passcode}
        />
      </div>
      <button class="btn btn-primary btn-sm mt-5 w-fit">Join Room</button>
    </div>
    <p class="py-4 text-sm text-warning">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
