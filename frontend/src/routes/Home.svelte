<script>
// @ts-nocheck
  // tools
  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import axios from 'axios';
  // data
  import { userData } from '../store';
  // display components
  import ThemeSelect from '../components/ThemeSelect.svelte';
  import Profile from '../components/Profile.svelte';
  import MessageBlock from '../components/MessageBlock.svelte';
  import NameSpaces from '../components/NameSpaces.svelte';
  import RoomListComponent from '../components/RoomListComponent.svelte';
  import PrivateRoomListComponent from '../components/PrivateRoomListComponent.svelte';
  // action components
  import SendInputComponent from '../components/SendInputComponent.svelte';
  import AddRoomButton from '../components/AddRoomButton.svelte';
  // dialogs
  import CreateRoomDialog from '../components/CreateRoomDialog.svelte';
  import AddRoomDialog from '../components/AddRoomDialog.svelte';
  import JoinRoomDialog from '../components/JoinRoomDialog.svelte';
  import SendInviteDialog from '../components/SendInviteDialog.svelte';

  const API_URL = import.meta.env.VITE_API_URL;

  let userInfo = JSON.parse(localStorage.getItem('user'));

  // people present in current room
  let roomMembers = 0;
  // global room values
  let roomList = [], listenRooms = new Set(), joinedRooms = new Set();
  // private room values
  let privateRoomList = [], listenPrivateRooms = new Set(), passcode = '';
  
  // reference to div elements containing messages
  let messageBlock;
  
  // current room selected
  let currentRoom =  localStorage.getItem('currentRoom') || roomList[0]?.name;
  let currentNameSpace = localStorage.getItem('currentNameSpace') || '/';
  // message input box test
  let currentText = '';

  // sendInvite dialog
  let inviteCode = '', inviteUser = '', inviteRoom = '';

  let notifyMessages = [];

  let langCode = '';

  $: console.log(langCode);

  $: notificationMessages = notifyMessages;

  $: messages = roomList.reduce((acc, room) => {
    acc[room.name] = {history: room.messages, roomId: room.id};
    return acc
  }, {});

  $: privateMessages = privateRoomList.reduce((acc, room) => {
    acc[room.name] = {history: room.messages, roomId: room.id};
    return acc
  }, {});

  $: localStorage.setItem('currentRoom', currentRoom);

  $: localStorage.setItem('currentNameSpace', currentNameSpace);

  let socket = io(API_URL);
  let socketPrivate = io(`${API_URL}/private`);
  let socketNotify = io(`${API_URL}/notify`);

  const notificationListenerInit = (socketNotify) => {
    console.log('activated');
    socketNotify.on(`${userInfo.username}-notifications`, (notifications) => {
      notificationMessages = [...notificationMessages, notifications]
    })
  }

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

        socket.on(`${room.name}-message`, async (message) => {
          if (langCode && message.text && userInfo.username !== message.username) {
            const response = await axios.get(`${API_URL}/api/translate`, { params: { text: message.text, code: langCode } });
            message.translation = response.data.translation;
          }
          if (message.text) messages[message.currentRoom].history = [...messages[message.currentRoom].history, message];
        });
      }
    }
  }

  const privateRoomListenerInit = (privateSocket, privateRoomList) => {
    for (const privateRoom of privateRoomList) {
      privateSocket.emit('ghost join', { currentRoom: privateRoom.name, username: userInfo.username });
      if (!listenPrivateRooms.has(privateRoom.name)) {
        listenPrivateRooms = new Set([...listenPrivateRooms, privateRoom.name])
        privateSocket.on(`${privateRoom.name}-message`, (message) => {
          if (message.text) privateMessages[message.currentRoom].history = [...privateMessages[message.currentRoom].history, message];
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

  socketPrivate.on('delete room', (obj) => {
    if (obj.userId !== userInfo.id ) {
      privateRoomList = privateRoomList.filter((room) => room.id !== obj.roomId);
      if (obj.roomName === currentRoom) {
        localStorage.setItem('currentRoom', privaeRoomList[0]?.name);
        currentRoom = privateRoomList[0]?.name;
      }
    }
  })

  $: roomListenerInit(socket, roomList);
  $: privateRoomListenerInit(socketPrivate, privateRoomList);

  $: {
    async function fetchRoomData() {
      if (currentNameSpace === '/') {
        let response = await axios.get(`${API_URL}/api/rooms`, { params: {namespace: '/' }});
        roomList = response.data;
      } else if (currentNameSpace === '/private') {
        let privateResponse = await axios.get(`${API_URL}/api/rooms/private`, { params: { userId: userInfo.id }});
        privateRoomList = privateResponse.data;
      } else {
        let notifyResponse = await axios.get(`${API_URL}/api/notifications`, { params: { username: userInfo.username }})
        notifyMessages = notifyResponse.data;
      }
    }
    fetchRoomData();
  };

  $: if (currentRoom && currentNameSpace) {
    if (messageBlock) {
      setTimeout(() => {
        messageBlock.focus();
        messageBlock.scrollTo(0, messageBlock.scrollHeight)
      }, 200)
    };
  };

  onMount(async () => {
    let response = await axios.get(`${API_URL}/api/rooms`, { params: {namespace: '/' }});
    roomList = response.data;
    roomListenerInit(socket, roomList);
    socket.emit('join room', { currentRoom, username: userInfo.username });

    let privateResponse = await axios.get(`${API_URL}/api/rooms/private`, { params: { userId: userInfo.id }});
    privateRoomList = privateResponse.data;
    privateRoomListenerInit(socketPrivate, privateRoomList);

    let notifyResponse = await axios.get(`${API_URL}/api/notifications`, { params: { username: userInfo.username }})
    notifyMessages = notifyResponse.data;
    notificationListenerInit(socketNotify);
  });

  const roomClickHandler = (e) => {
    currentRoom = e.target.textContent;
    if (e.target?.dataset?.passcode) {
      passcode = e.target.dataset.passcode;
    } else {
      passcode = '';
    }
    if (currentNameSpace === "/") { 
      socket.emit('join room', { currentRoom, username: userInfo.username });
    } else {
      socketPrivate.emit('ghost join', { currentRoom, username: userInfo.username });
    }
  }

  const handleSendMessage = (e) => {
    if (currentNameSpace === "/") {
      socket.emit('room message', { currentRoom, username: userInfo.username, text: currentText, roomId: messages[currentRoom]?.roomId, namespace: "/" });
    } else {
      socketPrivate.emit('room message', { currentRoom, username: userInfo.username, text: currentText, roomId: privateMessages[currentRoom]?.roomId, namespace: "/private" });
    }
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
    await axios.delete(`${API_URL}/api/rooms`, { data: { roomId: id, username: userInfo.username, roomName: name } });
    // leave room connected by the server
    socket.emit('leave room', name);
  }

  const handlePrivateRoomDelete = async (roomId, roomName) => {
    const id = roomId;
    const name = roomName;
    privateRoomList = privateRoomList.filter((room) => room.id !== roomId);
    if (name === currentRoom) {
      localStorage.setItem('currentRoom', privateRoomList[0]?.name);
      currentRoom = privateRoomList[0]?.name;
    }
    // delete the room and all it's messages
    await axios.delete(`${API_URL}/api/rooms/private`, { data: { roomId: id, userId: userInfo.id, roomName: name } });
    // leave room connected by the server
    socket.emit('leave room', name);
  }
</script>

<div>
  <AddRoomDialog />
  <CreateRoomDialog bind:privateRoomList />
  <JoinRoomDialog bind:privateRoomList />
  <SendInviteDialog bind:socketNotify bind:inviteRoom bind:inviteCode bind:inviteUser />

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
          {:else if currentNameSpace === '/private'}
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
          {#if currentNameSpace === '/'}
          <RoomListComponent bind:roomList bind:currentRoom {roomClickHandler} {handleRoomDelete}/>
          {:else if currentNameSpace === '/private'}
          <PrivateRoomListComponent bind:inviteRoom bind:inviteCode bind:privateRoomList bind:currentRoom {roomClickHandler} {handlePrivateRoomDelete}/>
          {/if}
          <!-- -------------------------- /Room List ----------------------------- -->
        </div>
      </div>
    </div>

    <div class='w-4/6 h-screen flex flex-col'>
      <!-- ------------------------------------ Chat Header 2 ------------------------------------ -->
      <header class='h-20 border-b-4 border-neutral mx-5 flex items-center'>
        <h2 class='text-3xl'>{currentRoom} <span class="text-sm text-accent">{passcode && `(${passcode})`}</span></h2>
        <h3 class='text-center grow'>Members 0nline {roomMembers}</h3>
        <div class='ml-auto'>
          <ThemeSelect size={16} />
        </div>
      </header>
      <!-- ------------------------------------ /Chat Header 2 ------------------------------------ -->

      <!-- ------------------------------------ Message Block ------------------------------------ -->
      <MessageBlock bind:messageBlock bind:currentNameSpace bind:notificationMessages bind:privateMessages bind:messages bind:currentRoom />
      <!-- ------------------------------------ /Message Block ------------------------------------ -->

      <!-- ------------------------------------ Send Message Input ------------------------------------ -->
      <SendInputComponent on:click={handleSendMessage} bind:currentText bind:langCode />
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
