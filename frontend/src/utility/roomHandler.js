const findRoomId = (currentRoom, roomList) => {
  let roomId = '';
  if (roomList.length > 0) {
    const room = roomList.find((room) => room.name === currentRoom);
    roomId = room.id
  }
  return roomId;
}

export {
  findRoomId,
}
