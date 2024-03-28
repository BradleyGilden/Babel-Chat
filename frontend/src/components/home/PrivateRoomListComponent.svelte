<script>
  export let privateRoomList = [];
  export let inviteCode = "";
  export let inviteRoom = "";
  export let currentRoom = "";
  export let roomClickHandler;
  export let handlePrivateRoomDelete;

  const roomButtonClick = (e) => {
    roomClickHandler(e);
  };
  const deleteButtonClick = async (roomId, roomName) => {
    await handlePrivateRoomDelete(roomId, roomName);
  };

  const handleInitiateInvite = (e) => {
    inviteCode = e.target.dataset.passcode;
    inviteRoom = e.target.dataset.name;
    // @ts-ignore
    document.getElementById("send_invite_modal").showModal();
  };
</script>

{#each privateRoomList as room (room.id)}
  <div class="w-full relative flex items-center">
    <!-- -------------------------- Switch Room ----------------------------- -->
    <button
      data-fn="roomClickHandler"
      data-passcode={room.passcode}
      class={room.name === currentRoom
        ? "btn w-[63%] ml-3 btn-primary"
        : "btn w-3/5 ml-5"}
      on:click={roomButtonClick}>{room.name}</button
    >
    <!-- -------------------------- /Switch Room ----------------------------- -->

    <!-- ------------------------- Invitation Button -------------------------- -->

    <button
      class="btn border-5 border-primary font-bold text-primary absolute right-[15%]"
      data-passcode={room.passcode}
      data-name={room.name}
      on:click={handleInitiateInvite}
    >
      invite
    </button>

    <!-- ------------------------- /Invitation Button -------------------------- -->

    <!-- ------------------------- Delete Room Button -------------------------- -->
    <button
      data-fn="handlePrivateRoomDelete"
      class="hover:text-warning text-error absolute right-[5%]"
      on:click={async () => {
        await deleteButtonClick(room.id, room.name);
      }}
    >
      <svg
        class="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
          d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
        ></path></svg
      >
    </button>
    <!-- ------------------------- /Delete Room Button -------------------------- -->
  </div>
{/each}
