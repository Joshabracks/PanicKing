
// var socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function User(name, image, x, y, width, height) {
    this.name = name;
    this.image = new Image(100, 100);
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.speed = 5;
}

let user = new User("Smiley", "/images/smiley.png", 10, 10, 100, 100);

function setUser() { }
function startGame() { }

function drawCanvas() {
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(10, 10, canvas.width, canvas.height);
    ctx.drawImage(user.image, user.x, user.y, user.width, user.height)
}

function move(object){
    if (object.up == true) {
        object.y -= object.speed;
    }
    if (object.down == true) {
        object.y += object.speed;
    }
    if (object.left == true) {
        object.x -= object.speed;
    }
    if (object.right == true) {
        object.x += object.speed;
    }
    drawCanvas();
}
setInterval(function(){
    move(user);
}, 20);

//PLAYER INPUT
document.addEventListener("keydown", e => {
    // console.log(e);
    if (e.keyCode == 87){
        //W => UP
        user.up = true;
    }
    else if (e.keyCode == 65){
        //A => LEFT
        user.left = true;
    }
    else if (e.keyCode == 83){
        //S => DOWN
        user.down = true;
    }
    else if (e.keyCode == 68){
        //D => RIGHT
        user.right = true;
    }
    else if (e.keyCode == 32){
         
        console.log("space");
    }
});

document.addEventListener("keyup", e => {
    if (e.keyCode == 87){
        //W => UP
        user.up = false;
    }
    else if (e.keyCode == 65){
        //A => LEFT
        user.left = false;
    }
    else if (e.keyCode == 83){
        //S => DOWN
        user.down = false;
    }
    else if (e.keyCode == 68){
        //D => RIGHT
        user.right = false;
    }
    else if (e.keyCode == 32){
         
        console.log("space");
    }
});
//END PLAYER INPUT

function getUser() {
    if (user == null) {
        setUser();
    } else {
        startGame(user);
    }
}

function init() {
    // getUser();
    drawCanvas();
}

document.addEventListener('DOMContentLoaded', function() {
    init();
}, false);