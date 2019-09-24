let messages = [];
let rooms = {};
let incompleteRooms = {};
let players = {};
let playerCount = 1;
let roomCount = 1;
require('./gameObjects');
module.exports = function (io) {
io.on('connection', function (socket){
    socket.emit('greeting', {msg: 'PanicKing: Connected.'});
    socket.on('thankyou', function (data){
        console.log(data.msg);
    });
    socket.on('useraction', function (data){
        room[player.room.id].players[data.character.id] = data.character;
        io.to(player.room.id).emit('game update', {players: room[player.room.id].players});
    });
    socket.on('new player', function(data){
        let room;
        socket.join('main room');
        let character = data.character;
        character.id = playerCount;
        if (character.id == 1) {
            room = createRoom(0, 0)
            character.isKing = true;
        } else {
            room = addRoom();
        }
        character.room = room;
        room[players.id] = character;
        playerCount++;
        console.log('New Player: Verifying'); 
        socket.emit('player accepted', {user: character});
        io.to(room.id).emit('game update', {players: room.players});
    })
},);
}

function createRoom(xCoord, yCoord){
    room = new Room(xCoord, yCoord);
    return room;
}

function addRoom() {
    const room = incompleteRooms[Object.keys(incompleteRooms)[Math.floor(Math.random() * Object.keys(incompleteRooms).length)]];
    const direction = room.brokenDoors[Math.floor(math.random() * room.brokenDoors.length)];
    let temp = [];
    for (let i = 0; i < room.brokenDoors.length; i++) {
        if (room.brokenDoors[i] != direction) {
            temp.push(room.brokenDoors[i])
        }
    }
    if (temp.length > 0) {
        room.brokenDoors = temp;
    } else {
        delete incompleteRooms[room.id];
    }
    newRoom = createRoom(room[direction].xCoord, room[direction].yCoord);
    rooms[newRoom.id] = newRoom;
    //UPDATE ROOMS
    return newRoom;
}