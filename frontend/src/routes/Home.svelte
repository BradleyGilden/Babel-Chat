<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import { userData } from '../store';
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';
  import dateFormatter from '../utility/dateHandler';

  let userInfo = JSON.parse(localStorage.getItem('user'));
  let roomMembers = 0;
  let roomList = ["Just Chatting", "Sports", "Books", "Movies", "News", "Jobs"];
  let joinedRooms = []
  let currentRoom = 'Just Chatting';
  let currentText = '';

  $: messages = roomList.reduce((acc, key) => {
    acc[key] = []
    return acc
  }, {});

  const socket = io('http://localhost:3000');

  const roomListenerInit = (socket, roomList) => {
    for (const room of roomList) {
      socket.on(`${room}-status`, (message) => {
        roomMembers = message.numClients;
        if (!joinedRooms.includes(room)) {
          message.text = `${message.username} has joined ${room}`
          message.username = 'system';
          messages[currentRoom] = [...messages[currentRoom], message]
        }
        joinedRooms = [...joinedRooms, room]
      });
      socket.on(`${room}-message`, (message) => {
        if (message.text) messages[currentRoom] = [...messages[currentRoom], message];
      });
    }
  }

  
  onMount(() => {
    socket.on('connect', () => {
      roomListenerInit(socket, roomList);
      socket.emit('join room', { currentRoom, username: userInfo.username });
      console.log('connected');
    })
  });

  const roomClickHandler = (e) => {
    currentRoom = e.target.textContent;
    socket.emit('join room', { currentRoom, username: userInfo.username });
  }

  const handleSendMessage = (e) => {
    socket.emit('room message', { currentRoom, username: userInfo.username, text: currentText });
    currentText = '';
  }

</script>

<div>
  <div class='flex w-full font-inter'>
    <div class='w-1/5 h-screen max-h-screen bg-secondary-content'>
      <header class='h-20 flex items-center gap-6'>
        <Profile moniker={userInfo.username[0].toUpperCase()} status={'online'} />
        <h2 class='text-2xl'>{userInfo.username}</h2>
      </header>
      <a href="#/" class="btn btn-success w-full text-2xl">Settings</a>
      <div class="w-full flex">
        <!-- NameSpaces -->
        <div class='w-[6.75rem] max-h-screen border-r-4 border-r-neutral mt-5 flex flex-col items-center gap-y-10'>
          <div class="avatar global">
            <div class="w-20 rounded-xl">
              <img alt="namespace" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div class="avatar">
            <div class="w-20 rounded-xl">
              <img alt="namespace" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div class="avatar">
            <div class="w-20 rounded-xl">
              <img alt="namespace" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
        <!-- Room List -->
        <div class="my-5 flex flex-col gap-5 text-xl max-h-screen grow">
          {#each roomList as room, index (index)}
          <button
          class={room === currentRoom ? "btn w-[10rem] mx-auto btn-primary" : "btn w-[10rem] mx-auto"}
          on:click={roomClickHandler}
          >{room}</button>
          {/each}
        </div>
      </div>
    </div>

    <div class='w-4/5 h-screen flex flex-col'>
      <header class='h-20 border-b-4 border-neutral mx-5 flex items-center'>
        <h2 class='text-3xl'>{currentRoom}</h2>
        <h3 class='text-center grow'>Members 0nline {roomMembers}</h3>
        <div class='ml-auto'>
          <ThemeSelect size={16} />
        </div>
      </header>

      <div id="MessageBlock" class="w-full grow max-h-[calc(100vh-10rem)] overflow-auto p-10">
        {#each messages[currentRoom] as message }
        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div class="chat-header">
            Obi-Wan Kenobi
            <time class="text-xs opacity-50">{dateFormatter(message.date)}</time>
          </div>
          <pre class="chat-bubble">{message.text}</pre>
        </div>
        {/each}
      </div>


      <label class="h-20">
        <textarea class="textarea textarea-primary w-full text-xl" placeholder="Message" bind:value={currentText}></textarea>
        <button type="button" class="absolute w-5 h-5 z-10 mx-[-4rem] my-[1rem]" on:click={handleSendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 opacity-70"><path d="M1.94607 9.31543C1.42353 9.14125 1.4194 8.86022 1.95682 8.68108L21.043 2.31901C21.5715 2.14285 21.8746 2.43866 21.7265 2.95694L16.2733 22.0432C16.1223 22.5716 15.8177 22.59 15.5944 22.0876L11.9999 14L17.9999 6.00005L9.99992 12L1.94607 9.31543Z"></path></svg>
        </button>
      </label>
    </div>
  </div>
</div>

<style>
</style>
