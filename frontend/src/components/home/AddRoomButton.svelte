<div
  class="bg-secondary-content relative text-primary flex w-full rounded-none text-xl border-t-primary border-b-primary gap-5 justify-center"
>
  Add Room
  <!-- ------------------------ Add room Button ----------------------- -->
  <button
    class="h-8"
    on:click={() => document.getElementById("add_room_modal").showModal()}
  >
    <svg
      class="relative h-full text-primary hover:text-success"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
      ></path></svg
    >
  </button>
  <!-- ------------------------ /Add room Button ----------------------- -->
</div>
