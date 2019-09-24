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
        socket.join('main room');
        let character = data.character;
        character.id = playerCount;
        if (character.id == 1) {
            character.isKing = true;
        }
        players[character.id] = character;
        playerCount++;
        console.log('New Player: Verifying'); 
        socket.emit('player accepted', {user: character, players: players});
        io.to('main room').emit('game update', {players: players});
    })
},);
}
function createRoom(id){
    this.id = id;
}

function Room(){
    this.items = randomItem();
}

function randomItem(){

}