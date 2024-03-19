<script>
  import dateFormatter from '../utility/dateHandler';
  export let message;
  export let username;
</script>

{#if message.username === 'system'}
  <div class="chat chat-end">
    <div class="chat-header">
      {message.username}
      <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
    </div>
    <pre class="chat-bubble chat-bubble-warning">{message.text}</pre>
  </div>
{:else if message.username === username }
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
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
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div class="chat-header">
      {message.username}
      <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
    </div>
    <pre class="chat-bubble chat-bubble-primary">{message.text}</pre>
  </div>
{/if}
