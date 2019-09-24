
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
    this.eyes = "black";
    this.color = "#58595B";
    this.bandana = "red";
    this.lookHorz = 0;
    this.lookVert = 0;
    this.isKing = false;
}

let select = "body";

let character = null;
function createCharacter() {
    character = new User("", 200, 120, 75, 75);
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    drawNinja(character);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Body", 300, 100);
    ctx.fillStyle = "black";
    ctx.fillText("Eyes", 300, 200);
    ctx.fillText("Bandana", 300, 300);
    ctx.fillText("Join the Panic!!!", 300, 400);
}

function joinGame() {
    socket.emit('new player', {character: character});
}

