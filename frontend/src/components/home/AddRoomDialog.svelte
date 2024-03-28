<script>
  // Component for the dialog box for adding a room
  import axios from "axios";

  const API_URL = import.meta.env.VITE_API_URL;
  let addNewRoomName = "";
  let loadingNewRoom = false;

  // controlls the click event for adding a room
  const handleRoomAdd = async () => {
    loadingNewRoom = true;
    await axios.post(`${API_URL}/api/rooms`, { roomName: addNewRoomName });
    loadingNewRoom = false;
  };
</script>

<dialog id="add_room_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Insert room name in the input below</h3>
    <div class="w-full mt-3 flex gap-4">
      <input
        type="text"
        placeholder="Room Name"
        class="input input-bordered input-primary input-sm w-full max-w-xs grow"
        bind:value={addNewRoomName}
      />
      <button class="btn btn-primary btn-sm text-lg" on:click={handleRoomAdd}>
        {#if loadingNewRoom}
          <span class="loading loading-spinner"></span>
        {/if}
        add
      </button>
    </div>
    <p class="py-4 text-sm text-warning">
      Press ESC key or click outside to close
    </p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
