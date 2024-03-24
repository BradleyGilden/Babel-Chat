<script>
  import ChatBubbles from './ChatBubbles.svelte';

  export let messages = [];
  export let privateMessages = [];
  export let currentRoom = '';
  export let currentNameSpace = '/';
  let visibleMessages = [];
  let { username } = JSON.parse(localStorage.getItem('user'));

  $: {
    if (currentNameSpace === '/') {
      visibleMessages = messages;
    } else {
      visibleMessages = privateMessages;
    }
  }

</script>

<div id="MessageBlock" class="w-full grow max-h-[calc(100vh-10rem)] overflow-auto p-10 flex flex-col gap-y-5">
  {#if Array.isArray(visibleMessages[currentRoom]?.history)}
    {#each visibleMessages[currentRoom].history as message, index (message._id || index) }
      <ChatBubbles {message} {username} />
    {/each}
  {/if}
</div>
