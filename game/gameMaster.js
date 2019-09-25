
let messages = [];
let rooms = {};
let incompleteRooms = {};
let players = {};
let playerCount = 1;
let roomCount = 1;

module.exports = function (io) {
    
    io.on('connection', function (socket) {
        socket.emit('greeting', { msg: 'PanicKing: Connected.' });
        socket.on('thankyou', function (data) {
        console.log(data.msg);
        });
        socket.on('useraction', function (data) {
            rooms[data.character.room].players[data.character.id] = data.character;
            io.to(data.character.room).emit('game update', { players: rooms[data.character.room].players, room: rooms[data.character.room] });
        });
        socket.on('change rooms', function (data) {
            console.log(data);
            console.log(rooms);
            delete rooms[data.id].players[data.character.id];
            console.log(rooms[data.character.room]);
            console.log(data.character.room);
            rooms[data.character.room].players[data.character.id] = data.character;
            io.to(data.character.room).emit('game update', { players: rooms[data.character.room].players, room: rooms[data.id] });
        });
        socket.on('new player', function (data) {
            let room;
            
            let character = data.character;
            character.id = playerCount;
            
            if (character.id == 1) {
                room = new Room(0, 0);
                
                character.isKing = true;
               
            } else {
                room = addRoom();
            }
            character.room = room.id;
            room.players[character.id] = character;
            playerCount++;
            socket.join(room.id);
            rooms[room.id] = room;
            incompleteRooms[room.id] = room;
            runDoorCheck();
            console.log('New Player: Verifying');
            socket.emit('player accepted', { user: character });
            io.to(room.id).emit('game update', { players: room.players, room: rooms[room.id] });
        })
    });
    function runDoorCheck(){
        for (room in rooms) {
            checkDoors(rooms[room]);
        }
    }

    function checkDoors(room){
        if (rooms[room.north.id.x + ":" + room.north.id.y]) {
            // let current = rooms[room.north.id.x + ":" + room.north.id.y];
            room.north.door.exists = true;
            io.to(room.id).emit('game update', { players: room.players, room: room });
        }
        if (rooms[room.south.id.x + ":" + room.south.id.y]) {
            // let current = rooms[room.south.id.x + ":" + room.south.id.y];
            room.south.door.exists = true;
            io.to(room.id).emit('game update', { players: room.players, room: room });
        }
        if (rooms[room.east.id.x + ":" + room.east.id.y]) {
            // let current = rooms[room.east.id.x + ":" + room.east.id.y];
            room.east.door.exists = true;
            io.to(room.id).emit('game update', { players: room.players, room: room });
        }
        if (rooms[room.west.id.x + ":" + room.west.id.y]) {
            // let current = rooms[room.west.id.x + ":" + room.west.id.y];
            room.west.door.exists = true;
            io.to(room.id).emit('game update', { players: room.players, room: room });
        }
    }
}

function addRoom() {
    
    const room = incompleteRooms[Object.keys(incompleteRooms)[Math.floor(Math.random() * Object.keys(incompleteRooms).length)]];
    const direction = room.brokenDoors[Math.floor(Math.random() * room.brokenDoors.length)];
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
    newRoom = new Room(room[direction].id.x, room[direction].id.y);
    rooms[newRoom.id] = newRoom;
    //UPDATE ROOMS
    return newRoom;
}

//GAME OBJECTS

function Room(xCoord, yCoord) {
    this.id = xCoord + ":" + yCoord;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    //CONNECTED ROOMS BY THEIR COORDINATES
    this.north = {
        id: { x: this.xCoord, y: this.yCoord - 1 },
        door: {exists: false, locked: true}
    };
    this.south = {
        id: { x: this.xCoord, y: this.yCoord + 1 },
        door: {exists: false, locked: true}
    };
    this.east = {
        id: { x: this.xCoord + 1, y: this.yCoord },
        door: {exists: false, locked: true}
    };
    this.west = {
        id: { x: this.xCoord - 1, y: this.yCoord },
        door: {exists: false, locked: true}
    };
    //CONTAINERS WITHIN THIS ROOM || RANDOMLY GENERATED
    this.containers = {};
    this.players = {};
    this.brokenDoors = ['north', 'south', 'east', 'west'];
}

function Container() {
    this.type;
    this.room;
    this.contents;
    this.location;
    this.image;
}

// Strength Hat
function SpikedHelmet(player) {
    this.player = player;
    this.image = "spikedHelmet.svg";
    this.effect = () => {
        this.player.strength += 3;
    }
}

// Speed Hat
function SpeedHat(player) {
    this.player = player;
    this.image = "speedHat.svg";
    this.effect = () => {
        this.player.speed += 3;
    }
}

// JugHat
function helmet(player) {
    this.player = player;
    this.image = "helmet.svg";
    this.effect = () => {
        this.player.health += 20;
    }
}

// Crown
function Crown(player) {
    this.player = player;
    this.image = "crown.svg";

    this.effect = () => {
        this.player.strength += 3;
        this.player.speed += 3;
        this.player.health += 20;
    }
}



