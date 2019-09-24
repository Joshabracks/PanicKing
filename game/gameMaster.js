let messages = [];
let rooms = {};
let players = {};
let playerCount = 1;
let roomCount = 1;

module.exports = function (io) {
io.on('connection', function (socket){
    socket.emit('greeting', {msg: 'PanicKing: Connected.'});
    socket.on('thankyou', function (data){
        console.log(data.msg);
    });
    socket.on('useraction', function (data){
        players[data.character.id] = data.character;
        io.to('main room').emit('game update', {players: players});
    });
    socket.on('new player', function(data){
        // LET ROOM
        socket.join('main room');
        let character = data.character;
        character.id = playerCount;
        if (character.id == 1) {
            //CREATE ROOM 0:0
            character.isKing = true;
            //ROOM = 0:0
        }
        // ELSE CREATE NEW ROOM
        // CHARACTER.ROOM = ROOM
        // ADD CHARACTER TO ROOM.PLAYERS
        players[character.id] = character;
        playerCount++;
        console.log('New Player: Verifying'); 
        socket.emit('player accepted', {user: character, players: players});
        io.to('main room').emit('game update', {players: players});
    })
},);
}
function createRoom(){
    randomRoom = rooms[Object.keys(rooms)[Math.floor(Math.random() * Object.keys(rooms).length)]];
}

function Room(){
    this.items = randomItem();
}

function randomItem(){

}