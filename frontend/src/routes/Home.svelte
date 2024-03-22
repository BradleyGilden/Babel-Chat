<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import axios from 'axios';
  import { userData } from '../store';
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';
  import ChatBubbles from '../components/ChatBubbles.svelte';
  import NameSpaces from '../components/NameSpaces.svelte';
  import RoomListComponent from '../components/RoomListComponent.svelte';
  import SendInputComponent from '../components/SendInputComponent.svelte';
  import AddRoomButton from '../components/AddRoomButton.svelte';
  import AddRoomDialog from '../components/AddRoomDialog.svelte';
  import CreateRoomDialog from '../components/CreateRoomDialog.svelte';
  import JoinRoomDialog from '../components/JoinRoomDialog.svelte';

  let userInfo = JSON.parse(localStorage.getItem('user'));

  // people present in current room
  let roomMembers = 0;
  // room list
  let roomList = [];
  // socket room checks
  let listenRooms = new Set();
  let joinedRooms = new Set();
  // current room selected
  let currentRoom =  localStorage.getItem('currentRoom') || roomList[0]?.name;

  let currentNameSpace = '/';

  // message input box test
  let currentText = '';

  $: messages = roomList.reduce((acc, room) => {
    acc[room.name] = {history: room.messages, roomId: room.id};
    return acc
  }, {});

  $: localStorage.setItem('currentRoom', currentRoom);

  const socket = io('http://localhost:3000');
  const socketPrivate = io('http://localhost:3000/private');
  const socketNotify = io('http://localhost:3000/notify');

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

  socket.on('add room', (room) => { roomList = [...roomList, room] });

  socket.on('delete room', (obj) => {
    // add room instantly only if on the current namespace
    if (obj.username !== userInfo.username ) {
      roomList = roomList.filter((room) => room.id !== obj.roomId);
      if (obj.roomName === currentRoom) {
        localStorage.setItem('currentRoom', roomList[0]?.name);
        currentRoom = roomList[0]?.name;
      }
    } 
  });

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
    if (name === currentRoom) {
      localStorage.setItem('currentRoom', roomList[0]?.name);
      currentRoom = roomList[0]?.name;
    }
    // delete the room and all it's messages
    await axios.delete("http://localhost:3000/api/rooms", { data: { roomId: id, username: userInfo.username, roomName: name } });
    // leave room connected by the server
    socket.emit('leave room', name);
  }

</script>

<div>
  <AddRoomDialog />
  <CreateRoomDialog />
  <JoinRoomDialog />

  <div class='flex w-full font-inter'>
    <div class='w-2/6 h-screen max-h-screen bg-secondary-content'>
      <!-- ------------------------------------ Chat Header 1 ------------------------------------ -->
      <header class='h-20 flex items-center gap-6'>
        <Profile moniker={userInfo.username[0].toUpperCase()} status={'online'} />
        <h2 class='text-2xl'>{userInfo.username}</h2>
      </header>
      <!-- ------------------------------------ /Chat Header 1 ------------------------------------ -->
      <a href="#/" class="btn btn-secondary w-full text-2xl rounded-none">Settings</a>
      <div class="w-full flex">
        <!-- ------------------------------------ NameSpaces ------------------------------------ -->
        <NameSpaces bind:currentNameSpace />
        <!-- ------------------------------------ /NameSpaces ------------------------------------ -->
        <!-- Room List -->
        <div class="my-5 flex flex-col gap-5 text-xl max-h-screen grow">
          {#if currentNameSpace === '/'}
          <AddRoomButton />
          {:else}
          <div class="join w-full rounded-none">
            <button
              class="btn btn-success join-item text-xl w-1/2"
              on:click={() => document.getElementById("create_room_modal").showModal()}
            >Create Room
            </button>
            <button class="btn btn-accent join-item text-xl w-1/2"
            on:click={() => document.getElementById("join_room_modal").showModal()}
            >Join Room
            </button>
          </div>
          {/if}
          <!-- -------------------------- Room List ----------------------------- -->
          <RoomListComponent bind:roomList bind:currentRoom {roomClickHandler} {handleRoomDelete}/>
          <!-- -------------------------- /Room List ----------------------------- -->
        </div>
      </div>
    </div>

    <div class='w-4/6 h-screen flex flex-col'>
      <!-- ------------------------------------ Chat Header 2 ------------------------------------ -->
      <header class='h-20 border-b-4 border-neutral mx-5 flex items-center'>
        <h2 class='text-3xl'>{currentRoom}</h2>
        <h3 class='text-center grow'>Members 0nline {roomMembers}</h3>
        <div class='ml-auto'>
          <ThemeSelect size={16} />
        </div>
      </header>
      <!-- ------------------------------------ /Chat Header 2 ------------------------------------ -->

      <!-- ------------------------------------ Message Block ------------------------------------ -->
      <div id="MessageBlock" class="w-full grow max-h-[calc(100vh-10rem)] overflow-auto p-10 flex flex-col gap-y-5">
        {#if Array.isArray(messages[currentRoom]?.history)}
          {#each messages[currentRoom].history as message, index (index) }
            <ChatBubbles {message} username={userInfo.username} />
          {/each}
        {/if}
      </div>
      <!-- ------------------------------------ /Message Block ------------------------------------ -->

      <!-- ------------------------------------ Send Message Input ------------------------------------ -->
      <SendInputComponent on:click={handleSendMessage} bind:currentText />
      <!-- ------------------------------------ /Send Message Input ------------------------------------ -->
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
