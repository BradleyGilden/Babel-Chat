<script>
  import langs from "../../utility/languages";

  let langPick = "";
  export let langCode = "";
  $: langCode = langs[langPick];
</script>

<input
  bind:value={langPick}
  placeholder="select language"
  class="absolute h-10 right-28 top-[1.25rem]
        bg-secondary text-secondary-content
        placeholder-gray-700 text-lg w-fit
        text-center rounded-3xl font-bold"
  list="lang_select"
/>
<datalist id="lang_select">
  {#each Object.keys(langs) as name}
    <option value={name}>{langs[name]}</option>
  {/each}
</datalist>
