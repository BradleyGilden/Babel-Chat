<script>
  import dateFormatter from '../utility/dateHandler';
  import Profile from './Profile.svelte';

  export let message;
  export let username;
  export let system = false;
</script>

{#if message?.system || system}
  <div class="chat chat-end">
    <div class="chat-header">
      SYSTEM
      <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
    </div>
    <pre class="chat-bubble chat-bubble-warning">{message.translation ? message.translation : message.text}</pre>
  </div>
{:else if message.username === username }
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <Profile moniker={message.username[0].toUpperCase()} status={'online'} width={10} fontSize={'xl'} />
    </div>
    <div class="chat-header">
      {message.username}
      <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
    </div>
    <pre class="chat-bubble">{message.text}</pre>
  </div>
{:else }
  <div class="chat chat-end">
    <div class="chat-image avatar">
      <Profile moniker={message.username[0].toUpperCase()} status={'online'} width={10} fontSize={'xl'} />
    </div>
    <div class="chat-header">
      {message.username}
      <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
    </div>
    <pre class="chat-bubble chat-bubble-primary">{message.translation ? message.translation : message.text}</pre>
  </div>
{/if}
