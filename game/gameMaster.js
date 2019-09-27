let messages = [];
let rooms = {};
let incompleteRooms = {};
let players = {};
let playerCount = 1;
let roomCount = 1;
let itemCount = 0;

module.exports = function (io) {

    io.on('connection', function (socket) {
        socket.emit('greeting', { msg: 'PanicKing: Connected.', id: socket.id });
        socket.on('thankyou', function (data) {
            console.log(data.msg);
        });
        socket.on('useraction', function (data) {
            try {
                let character = rooms[data.character.room].players[data.character.id];
                character.x = data.character.x;
                character.y = data.character.y;
                character.health = data.character.health;
                character.lookVert = data.character.lookVert;
                character.lookHorz = data.character.lookHorz;
                itemCollision(rooms[data.character.room]);
                io.to(data.character.room).emit('game update', { room: rooms[data.character.room] });
            }
            catch (error) { console.log(error) };
        });
        // socket.on('itemaction', function (data) {
        //     rooms[data.room.id].contents = data.room.contents;
        //     io.to(data.room.id).emit('game update', { room: rooms[data.room.id] });
        // });
        // socket.on('itempickup', function(data){
        //     console.log('ITEM PICKUP: ', data);
        //     character = rooms[data.room.id].players[data.character.id];
        //     console.log('CHARACTER: ', character);
        //     character.inventory[data.item.id] = data.item;
        //     //UPDATE ITEMS TO HAVE UNIQUE IDS
        //     io.to(data.room.id).emit('game update', { room: rooms[data.room.id] });
        // })
        socket.on('change rooms', function (data) {
            socket.leave(data.id);
            socket.join(data.character.room);
            delete rooms[data.id].players[data.character.id];
            rooms[data.character.room].players[data.character.id] = data.character;
            io.to(data.character.room).emit('game update', { room: rooms[data.character.room] });
            io.to(data.id).emit('game update', { room: rooms[data.id] });
        });
        socket.on('new player', function (data) {
            let room;
            let character = data.character;
            character.count = playerCount;
            if (character.count == 1) {
                room = new Room(0, 0);
                // character.isKing = true;
                const crown = new Crown;
                character.hat = crown;
                dawnHat(character, crown);
            } else {
                room = addRoom();
                const rando = randomItem();
                room.contents[rando.id] = rando;
            }
            //generate key
            key = new Key(character, room);
            console.log(key.id);
            character.keys[key.id] = key;
            character.room = room.id;
            room.players[character.id] = character;
            playerCount++;
            socket.join(room.id);
            rooms[room.id] = room;
            incompleteRooms[room.id] = room;
            runDoorCheck();
            console.log('New Player: Verifying');
            socket.emit('player accepted', { user: character });
            io.to(room.id).emit('game update', { room: rooms[room.id] });
        })
        socket.on('disconnect', function (data) {
            let hp = new HealthPack();
            for (place in rooms) {
                let room = rooms[place];
                for (player in room.players) {
                    let current = room.players[player];
                    if (current.id == socket.id) {
                        let looseKeys = current.keys;
                        // let isKing = false;
                        // if (current.isKing) {
                        //     isKing = true;
                        // }
                        for (key in looseKeys) {
                            looseKeys[key].x = current.x;
                            looseKeys[key].y = current.y;
                            room.contents[looseKeys[key].id] = looseKeys[key];
                        }
                        if (current.hat) {
                            hat = current.hat;
                            hat.x = current.x;
                            hat.y = current.y;
                            room.contents[current.hat.id] = current.hat;
                        }
                        hp.x = current.x;
                        hp.y = current.y;
                        room.contents[hp.id] = hp;
                        delete rooms[place].players[player];
                        io.to(room.id).emit('game update', { room: room });
                    }
                }
            }
        });
    });
    function itemCollision(room) {
        for (object in room.contents) {
            let item = room.contents[object];
            for (key in room.contents) {
                if (room.contents[key] != item) {
                    let current = room.contents[key];
                    // if ((Math.abs(item.x - current.x) < 50) && (Math.abs(item.y - current.y) < 50)) {
                    //     let dist = 50 - ((Math.abs(item.x - current.x) + Math.abs(item.y - current.y))/2);
                    //     if (current.x == item.x) {
                    //         item.x = item.x + ((Math.random() * 2) - 1);
                    //     }
                    //     if (current.y == item.y) {
                    //         item.y = item.y + ((Math.random() * 2) - 1);
                    //     }
                    //     if (current.x > item.x) {
                    //         item.x -= dist/10;
                    //     }
                    //     if (current.x < item.x) {d
                    //         item.x += dist/10;
                    //     }
                    //     if (current.y > item.y) {
                    //         item.y -= dist/10;
                    //     }
                    //     if (current.y < item.y) {
                    //         item.y += dist/10;
                    //     }
                    // }
                }
                for (player in room.players) {
                    let current = room.players[player];
                    if ((Math.abs(item.x - current.x) < 90) && (Math.abs(item.y - current.y) < 90)) {
                        if (item.type == 'crown') {
                            if (current.hat) {
                                removeHat(current, item);
                                current.inventory[current.hat.id] = current.hat;
                            }
                            current.hat = item;
                            dawnHat(current, item)
                        } else if (item.type == 'hat') {
                            if (current.hat) {
                                current.inventory[item.id] = item;
                            } else {
                                current.hat = item;
                                dawnHat(current, item);
                            }
                        } else if (item.type == 'key') {
                            console.log('Key Pickup: ', item);
                            current.keys[item.id] = item;
                        } else if (item.type == 'health') {
                            current.health += item.health;
                        }
                        else {
                            current.inventory[item.id] = item;
                        }
                        delete room.contents[item.id];
                        let keyRing = Object.keys(current.keys);
                        let bag = Object.keys(current.inventory);
                        current.keyRing = keyRing;
                        current.bag = bag;
                        current.keyTotal = keyRing.length;
                        current.bagTotal = bag.length;
                        rooms[current.room].players[current.id] = current;
                    }
                }
            }
        }
    }

    function randomItem() {
        let randInt = Math.floor(Math.random() * 4);
        let newItem;
        if (randInt == 0) {
            newItem = new Helmet();
        }
        if (randInt == 1) {
            newItem = new SpikedHelmet();
        }
        if (randInt == 2) {
            newItem = new SpeedHat();
        }
        if (randInt == 3) {
            newItem = new HealthPack();
        }
        newItem.x = Math.floor((Math.random() * 600) + 25);
        newItem.y = Math.floor((Math.random() * 400) + 25);
        return newItem;
    }

    function runDoorCheck() {
        for (room in rooms) {
            checkDoors(rooms[room]);
        }
    }

    function checkDoors(room) {
        if (rooms[room.north.id.x + ":" + room.north.id.y]) {
            // let current = rooms[room.north.id.x + ":" + room.north.id.y];
            room.north.door.exists = true;
            io.to(room.id).emit('game update', { room: room });
        }
        if (rooms[room.south.id.x + ":" + room.south.id.y]) {
            // let current = rooms[room.south.id.x + ":" + room.south.id.y];
            room.south.door.exists = true;
            io.to(room.id).emit('game update', { room: room });
        }
        if (rooms[room.east.id.x + ":" + room.east.id.y]) {
            // let current = rooms[room.east.id.x + ":" + room.east.id.y];
            room.east.door.exists = true;
            io.to(room.id).emit('game update', { room: room });
        }
        if (rooms[room.west.id.x + ":" + room.west.id.y]) {
            // let current = rooms[room.west.id.x + ":" + room.west.id.y];
            room.west.door.exists = true;
            io.to(room.id).emit('game update', { room: room });
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
        door: { exists: false, locked: true }
    };
    this.south = {
        id: { x: this.xCoord, y: this.yCoord + 1 },
        door: { exists: false, locked: true }
    };
    this.east = {
        id: { x: this.xCoord + 1, y: this.yCoord },
        door: { exists: false, locked: true }
    };
    this.west = {
        id: { x: this.xCoord - 1, y: this.yCoord },
        door: { exists: false, locked: true }
    };
    //CONTAINERS WITHIN THIS ROOM || RANDOMLY GENERATED
    this.containers = {};
    this.players = {};
    this.brokenDoors = ['north', 'south', 'east', 'west'];
    this.contents = {};
    this.color = randomMutedColor();
}

function Container() {
    this.type;
    this.room;
    this.contents;
    this.location;
    this.image;
}

// Strength Hat
function SpikedHelmet() {
    this.type = 'hat';
    this.id = itemCount;
    itemCount++;
    this.image = "images/spikedHelmet.svg";
    this.width = 200;
    this.height = 200;
    this.drawLoc = { x: 78, y: 135 };
    this.health = 0;
    this.strength = 4;
    this.speed = 0;
}

// Speed Hat
function SpeedHat() {
    this.type = 'hat';
    this.id = itemCount;
    itemCount++;
    this.image = "images/speedCap.svg";
    this.width = 41.364;
    this.height = 41.364;
    this.drawLoc = { x: 75, y: 110 };
    this.health = 0;
    this.strength = 0;
    this.speed = 3;
}

// JugHat
function Helmet() {
    this.type = 'hat';
    this.id = itemCount;
    itemCount++;
    this.image = "images/helmet.svg";
    this.width = 41.364;
    this.height = 41.364;
    this.drawLoc = { x: 75, y: 100 };
    this.health = 30;
    this.strength = 0;
    this.speed = 0;
}

// Crown
function Crown() {
    this.type = 'crown';
    this.id = itemCount;
    itemCount++;
    this.image = "images/crown.svg";
    this.width = 41.364;
    this.height = 41.364;
    this.drawLoc = { x: 70, y: 70 };
    this.health = 20;
    this.strength = 3;
    this.speed = 2;
}

function HealthPack() {
    this.type = 'health';
    this.id = itemCount;
    itemCount++;
    this.width = 41.364;
    this.height = 41.364;
    this.drawLoc = { x: 70, y: 70 };
    this.image = "images/healthPack.svg";
    this.health = Math.floor((Math.random() * 20) + 5);
}
function dawnHat(character, hat) {
    character.strength += hat.strength;
    character.speed += hat.speed;
    character.health += hat.health;
}
function removeHat(character, hat) {
    character.strength -= hat.strength;
    character.speed -= hat.speed;
    character.health -= hat.health;
}


function Key(character, room) {
    this.id = itemCount;
    itemCount++;
    this.type = 'key';
    this.color1 = character.color;
    this.color2 = character.eyes;
    this.color3 = character.bandana;
    this.image = 'images/key.svg';
    this.width = 41.364;
    this.height = 41.364;
    this.rooms = {};
    this.rooms[room.north.id.x + ":" + room.north.id.y] = true;
    this.rooms[room.south.id.x + ":" + room.south.id.y] = true;
    this.rooms[room.east.id.x + ":" + room.east.id.y] = true;
    this.rooms[room.west.id.x + ":" + room.north.id.y] = true;
    this.rooms[room.id] = true;
}

function randomMutedColor(){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 100) - 50;
    if (g < 0) {
        g = 0;
        g += Math.floor(Math.random() * 50);
    }
    if (g > 255) {
        g = 255;
        g -= Math.floor(Math.random() * 50)
    } 
    let b = Math.floor(Math.random() * 100) - 50;
    if (b < 0) {
        b = 0;
        b += Math.floor(Math.random() * 50);
    }
    if (b > 255) {
        b = 255;
        b -= Math.floor(Math.random() * 50)
    } 
    let color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}