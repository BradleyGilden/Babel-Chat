<script>
  export let moniker;
  export let status;
</script>

<div class={`avatar ${status} placeholder pl-5`}>
  <div class="bg-neutral text-neutral-content rounded-full w-16">
    <span class="text-3xl">{moniker}</span>
  </div>
</div>
