<script>
  import axios from "axios";
  import Swal from 'sweetalert2';

  // Dialog Box for the create room button
  export let privateRoomList = [];
  let addNewRoomName = '';
  let loadingNewRoom = false;
  let passcode = '';
  const { id } = JSON.parse(localStorage.getItem('user'));

  const handleJoinRoom = async () => {
    loadingNewRoom = true;
    try {
      const response = await axios.post('http://localhost:3000/api/rooms/private/join', {
        roomName: addNewRoomName,
        passcode,
        userId: id,
      });
      loadingNewRoom = false;
      if (response.status < 400) {
        privateRoomList = [...privateRoomList, response.data];
      }
    } catch (err) {
      loadingNewRoom = false;
      document.getElementById('joinRoomClose').click();
      Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err?.response?.data.message,
      });
    }
  }

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
      <button
        class="btn btn-primary btn-sm mt-5 w-fit"
        on:click={handleJoinRoom}
      >
      {#if loadingNewRoom}
      <span class="loading loading-spinner"></span>
      {/if}
      Join Room
      </button>
    </div>
    <p class="py-4 text-sm text-warning">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button id="joinRoomClose">close</button>
  </form>
</dialog>
