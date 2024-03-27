<script>
  export let width = 16;
  export let fontSize = '3xl';
  export let moniker;
  export let status;
</script>

<div class={`avatar ${status} placeholder pl-5`}>
  <div class={`bg-neutral text-neutral-content rounded-full w-${width}`}>
    <span class={`text-${fontSize}`}>{moniker}</span>
  </div>
</div>
