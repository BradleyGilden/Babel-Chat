<script>
  // Profile image component that generates letter profiles for each user
  export let width = "16";
  export let fontSize = "3xl";
  export let moniker;
  export let status;
</script>

<div class={`avatar ${status} placeholder pl-5`}>
  <div
    class={width === "48"
      ? `bg-neutral text-neutral-content rounded-full w-48`
      : `bg-neutral text-neutral-content rounded-full w-${width}`}
  >
    <span class={`text-${fontSize}`}>{moniker}</span>
  </div>
</div>
