
function User(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.speed = 5;
    this.strength = 5;
    this.health = 50;
    this.eyes = "black";
    this.color = "#58595B";
    this.bandana = "red";
    this.lookHorz = 0;
    this.lookVert = 0;
    this.hat = false;
    this.room;
    this.health = 50;
    this.keys = {};
    this.inventory = {};
    this.bag = [];
    this.keyRing = [];
    this.bagTotal = [];
    this.keyTotal = [];
}

let select = "body";

let character = null;
function createCharacter() {
    character = new User("", 200, 120, 75, 75);
    character.id = id;
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(10, 10, width - 20, height - 20);
    drawNinja(character);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Body", 300, 100);
    ctx.fillStyle = "black";
    ctx.fillText("Eyes", 300, 200);
    ctx.fillText("Bandana", 300, 300);
    ctx.fillText("Join the Panic!!!", 300, 400);
    ctx.font = "15px Arial"
    ctx.fillText("MOVE: WASD | SELECT : SPACEBAR", 15, 585);
}

function joinGame() {
    socket.emit('new player', {character: character});
}

