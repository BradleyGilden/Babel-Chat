<script>
  import { onMount } from "svelte";
  import ChatBubbles from "./ChatBubbles.svelte";

  export let messageBlock;
  export let messages = [];
  export let privateMessages = [];
  export let notificationMessages = [];
  export let currentRoom = "";
  export let currentNameSpace = "/";
  let visibleMessages = [];
  let { username } = JSON.parse(localStorage.getItem("user"));

  $: {
    if (currentNameSpace === "/") {
      visibleMessages = messages;
    } else if (currentNameSpace === "/private") {
      visibleMessages = privateMessages;
    } else {
      visibleMessages = notificationMessages;
    }
  }

  onMount(() => {
    setTimeout(() => {
      messageBlock.focus();
      messageBlock.scrollTo(0, messageBlock.scrollHeight);
    }, 1000);
  });
</script>

<div
  bind:this={messageBlock}
  id="MessageBlock"
  class="w-full grow max-h-[calc(100vh-10rem)] overflow-auto p-10 flex flex-col gap-y-5"
>
  {#if Array.isArray(visibleMessages[currentRoom]?.history)}
    {#each visibleMessages[currentRoom].history as message, index (message._id || index)}
      <ChatBubbles {message} {username} />
    {/each}
  {:else if currentNameSpace === "/notify"}
    {#each visibleMessages as message, index (message._id || index)}
      <ChatBubbles {message} username={"SYSTEM"} system={true} />
    {/each}
  {/if}
</div>
