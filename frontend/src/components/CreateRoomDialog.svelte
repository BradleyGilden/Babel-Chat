<script>
  // Dialog Box for the create room button
  import { nanoid } from 'nanoid';
  let addNewRoomName = '';
  let loadingNewRoom = false;
  let passcode = nanoid(8);

  const regeneratePass = (_e) => {
    passcode = nanoid(8);
  }
</script>

<dialog id="create_room_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Insert room name in the input below</h3>
    <div class="w-full mt-3 flex flex-col gap-4">
      <input 
      type="text"
      placeholder="Room Name"
      class="input input-bordered input-primary input-sm w-full max-w-xs grow"
      bind:value={addNewRoomName}
      />
      <div class="flex items-center gap-2 w-full">
        <p class="font-bold">Pass Code: <span class="text-accent">{passcode}</span></p> 
        <button class="btn btn-sm" on:click={navigator.clipboard.writeText(passcode)}>copy</button>
        <button class="absolute btn btn-sm btn-success right-[10rem]" on:click={regeneratePass}>regen</button>
      </div>
      <button class="btn btn-primary btn-sm mt-5 w-fit">Create Room</button>
    </div>
    <p class="py-4 text-sm text-warning">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
