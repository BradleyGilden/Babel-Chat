<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import axios from 'axios';
  import { userData } from '../store';
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';
  import ChatBubbles from '../components/ChatBubbles.svelte';

  let userInfo = JSON.parse(localStorage.getItem('user'));
  let roomMembers = 0;
  let roomList = [];
  let listenRooms = new Set();
  let joinedRooms = new Set();
  let currentRoom = 'Just Chatting';
  let currentText = '';

  $: messages = roomList.reduce((acc, room) => {
    acc[room.name] = {history: room.messages, roomId: room.id};
    return acc
  }, {});

  const socket = io('http://localhost:3000');

  const roomListenerInit = (socket, roomList) => {
    for (const room of roomList) {
      if (!listenRooms.has(room.name)) {
        listenRooms = new Set([...listenRooms, room.name])
        socket.on(`${room.name}-status`, (message) => {
          roomMembers = message.numClients;
          if (!joinedRooms.has(room.name)) {
            message.text = `${message.username} has joined ${room.name}`
            message.username = 'system';
            messages[currentRoom].history = [...messages[currentRoom].history, message]
          }
          joinedRooms = new Set([...joinedRooms, room.name]);
        });
        socket.on(`${room.name}-message`, (message) => {
          if (message.text) messages[message.currentRoom].history = [...messages[message.currentRoom].history, message];
        });
      }
    }
  }

  
  onMount(async () => {
    let response = await axios.get("http://localhost:3000/api/rooms", { params: {namespace: '/' }});
    roomList = response.data;
    roomListenerInit(socket, roomList);
    socket.emit('join room', { currentRoom, username: userInfo.username });
    console.log('connected');
  });

  const roomClickHandler = (e) => {
    currentRoom = e.target.textContent;
    socket.emit('join room', { currentRoom, username: userInfo.username });
  }

  const handleSendMessage = (e) => {
    socket.emit('room message', { currentRoom, username: userInfo.username, text: currentText, roomId: messages[currentRoom]?.roomId });
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
          {#each roomList as room (room.id)}
          <button
          class={room.name === currentRoom ? "btn w-[10rem] mx-auto btn-primary" : "btn w-[10rem] mx-auto"}
          on:click={roomClickHandler}
          >{room.name}</button>
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

      <div id="MessageBlock" class="w-full grow max-h-[calc(100vh-10rem)] overflow-auto p-10 flex flex-col gap-y-5">
        {#if Array.isArray(messages[currentRoom]?.history)}
          {#each messages[currentRoom].history as message, index (index) }
            <ChatBubbles {message} username={userInfo.username} />
          {/each}
        {/if}
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
