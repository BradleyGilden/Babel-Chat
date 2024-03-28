<script>
  export let roomList = [];
  export let currentRoom = "";
  export let roomClickHandler;
  export let handleRoomDelete;
  const roomButtonClick = (e) => {
    roomClickHandler(e);
  };
  const deleteButtonClick = async (roomId, roomName) => {
    await handleRoomDelete(roomId, roomName);
  };
</script>

{#each roomList as room (room.id)}
  <div class="w-full relative">
    <!-- -------------------------- Switch Room ----------------------------- -->
    <button
      data-fn="roomClickHandler"
      class={room.name === currentRoom
        ? "btn w-[63%] ml-3 btn-primary"
        : "btn w-3/5 ml-5"}
      on:click={roomButtonClick}>{room.name}</button
    >
    <!-- -------------------------- /Switch Room ----------------------------- -->

    <!-- ------------------------- Delete Room Button -------------------------- -->
    <button
      data-fn="handleRoomDelete"
      class="absolute hover:text-warning text-error right-[13%]"
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
