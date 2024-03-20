<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import axios from 'axios';
  import { userData } from '../store';
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';
  import ChatBubbles from '../components/ChatBubbles.svelte';
  import NameSpaces from '../components/NameSpaces.svelte'

  let userInfo = JSON.parse(localStorage.getItem('user'));
  let roomMembers = 0;
  let roomList = [];
  let listenRooms = new Set();
  let joinedRooms = new Set();
  let currentRoom =  localStorage.getItem('currentRoom') || 'Just Chatting';
  let currentText = '';

  $: messages = roomList.reduce((acc, room) => {
    acc[room.name] = {history: room.messages, roomId: room.id};
    return acc
  }, {});

$: localStorage.setItem('currentRoom', currentRoom);

  const socket = io('http://localhost:3000');

  const roomListenerInit = (socket, roomList) => {
    for (const room of roomList) {
      if (!listenRooms.has(room.name)) {
        socket.emit('ghost join', { currentRoom: room.name, username: userInfo.username });

        listenRooms = new Set([...listenRooms, room.name])
        socket.on(`${room.name}-status`, (message) => {
          roomMembers = message.numClients;
          if (!joinedRooms.has(room.name) || (joinedRooms.has(room.name) && userInfo.username !== message.username)) {
            message.text = `${message.username} has joined ${room.name}`
            messages[room.name].history = [...messages[room.name].history, message]
          }
          joinedRooms = new Set([...joinedRooms, room.name]);
        });

        socket.on(`${room.name}-message`, (message) => {
          if (message.text) messages[message.currentRoom].history = [...messages[message.currentRoom].history, message];
        });
      }
    }
  }

  $: roomListenerInit(socket, roomList);

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

  const handleRoomDelete = async (roomId, roomName) => {
    const id = roomId;
    const name = roomName;
    roomList = roomList.filter((room) => room.id !== roomId);
    // delete the room and all it's messages
    await axios.delete("http://localhost:3000/api/rooms", { data: { roomId: id } });
    // leave room connected by the server
    socket.emit('leave room', name);
  }

</script>

<div>
  <div class='flex w-full font-inter'>
    <div class='w-2/6 h-screen max-h-screen bg-secondary-content'>
      <header class='h-20 flex items-center gap-6'>
        <Profile moniker={userInfo.username[0].toUpperCase()} status={'online'} />
        <h2 class='text-2xl'>{userInfo.username}</h2>
      </header>
      <a href="#/" class="btn btn-secondary w-full text-2xl rounded-none">Settings</a>
      <div class="w-full flex">
        <!-- NameSpaces -->
        <NameSpaces />
        <!-- Room List -->
        <div class="my-5 flex flex-col gap-5 text-xl max-h-screen grow">
          <div class="bg-secondary-content relative text-primary flex w-full rounded-none text-xl border-t-primary border-b-primary gap-5 justify-center">
            Add Room
            <button class="h-8">
              <svg class="relative h-full text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path></svg>
            </button>
          </div>
          {#each roomList as room (room.id)}
          <div class="w-full relative">
            <button
            class={room.name === currentRoom ? "btn w-[63%] ml-5 btn-primary" : "btn w-3/5 ml-5"}
            on:click={roomClickHandler}
            >{room.name}</button>
            <button 
            class="absolute hover:text-warning text-error right-[13%]"
            on:click={ async () => { await handleRoomDelete(room.id, room.name) }}
            >
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"></path></svg>
            </button>
          </div>
          {/each}
        </div>
      </div>
    </div>

    <div class='w-4/6 h-screen flex flex-col'>
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
*::-webkit-scrollbar {
  width: 1rem; /* Optional, adjust width if needed */
}

*::-webkit-scrollbar-track {
  background: #060715; /* Color of the track */
}

*::-webkit-scrollbar-thumb {
  background: #38BDF8; /* Color of the thumb */
  border-radius: 20px; /* Roundness of the thumb */
}
</style>
