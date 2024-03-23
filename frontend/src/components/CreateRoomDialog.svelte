<script>
  // @ts-nocheck
  // Dialog Box for the create room button
  import axios from 'axios';
  import { nanoid } from 'nanoid';

  export let privateRoomList = [];
  let addNewRoomName = '';
  let loadingNewRoom = false;
  let passcode = nanoid(8);
  const { id } = JSON.parse(localStorage.getItem('user'));

  const regeneratePass = (_e) => {
    passcode = nanoid(8);
  }

  const handleCreateRoom = async () => {
    loadingNewRoom = true;
    const response = await axios.post('http://localhost:3000/api/rooms/private', {
      roomName: addNewRoomName,
      userId: id,
      passcode,
    });

    loadingNewRoom = false;
    privateRoomList = [...privateRoomList, response.data];
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
      <button 
        class="btn btn-primary btn-sm mt-5 w-fit"
        on:click={handleCreateRoom}
      >
      {#if loadingNewRoom}
      <span class="loading loading-spinner"></span>
      {/if}
      Create Room
      </button>
    </div>
    <p class="py-4 text-sm text-warning">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
