const socket = io();
socket.on('greeting', function (data) { //4
    console.log(data.msg); //5
    id = data.id;
    socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client', id: id }); //6
});
let id;
let moving = false;
let players;
let room;
let blocked = false;
let equip = false;

let mode = "title";

let titleCard = new Image(600, 255);
titleCard.src = "images/title.svg";

let alpha = 0;
let delta = 0.01;
function title() {
    ctx.imageSmoothingEnabled;
    titleCard.onload = function () {
        const titleFade = setInterval(function () {

            if (alpha <= 1) {
                ctx.globalAlpha = 1;
                ctx.fillStyle = 'darkslategrey';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'slategrey';
                ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
                ctx.globalAlpha = alpha;
                ctx.drawImage(titleCard, 100, 150);
                ctx.font = "15px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Press Any Key", 600, 400);
                alpha += delta;
                delta += .01
            }
            else {
                ctx.globalAlpha = 1;
                ctx.fillStyle = 'darkslategrey';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'slategrey';
                ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
                ctx.drawImage(titleCard, 100, 150);
                ctx.font = "15px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Press Any Key", 600, 400);
                clearInterval(titleFade);
            }
        }, 40);
    }
}



const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const ctx = canvas.getContext("2d");
let user = null;


// let user = new User("Smiley", 10, 10, 100, 100);


function setUser() { }
function startGame() { }

function drawCanvas() {
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    if (user != null) {
        
    } else {
        title();
    }
}


setInterval(function () {
    if (user != null) {
        ctx.fillStyle = 'darkslategrey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'slategrey';
        ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
        drawDoors();
        blocked = false;
        for (thing in players) {
            let current = players[thing];
            drawNinja(current);
            if (current.id != user.id) {
                if ((Math.abs(user.x - current.x) < 90) && (Math.abs(user.y - current.y) < 90)) {
                    blocked = true;
                }
            }
        }
        
        if (blocked == false) {
            move(user);
        } else {
            bounce(user);
        }
        players[user.id] = user;
        if (moving == true) {
            socket.emit('useraction', { character: user });
        }
        isMoving();
        travelCheck();
        itemCheck();
    }
}, 20);

function getUser() {
    if (user == null) {
        setUser();
    }
}

function init() {
    // getUser()
    drawCanvas();
}

document.addEventListener('DOMContentLoaded', function () {
    init();
}, false);

socket.on('player accepted', function (data) {
    console.log('User Verified');
    user = data.user;
    players = data.players;
});

socket.on('game update', function (data) {
    delete room;
    delete players;
    players = data.room.players;
    room = data.room;
    user.room = data.room.id;

    // for (player in data.players) {
    //     if (data.players[player].id != user.id) {
    //         players[player] = data.players[player];
    //     }
    // }
});

function isMoving() {
    if ((user.up == false) && (user.down == false) && (user.left == false) && (user.right == false) && (user.lookHorz == 0) && (user.lookVert == 0)) {
        moving = false;
    }
    else {
        moving = true;
    }
}