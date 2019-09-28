
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const height = 600;
const width = 800;

function scaleWindow() {
    ctx.getImageData;

    let wideScale = window.innerWidth / 800;
    let highScale = window.innerHeight / 600;
    if (wideScale < highScale) {
        ctx.canvas.height = height * wideScale;
        ctx.canvas.width = width * wideScale;
        ctx.scale(wideScale, wideScale);
    } else {
        ctx.canvas.height = height * highScale;
        ctx.canvas.width = width * highScale;
        ctx.scale(highScale, highScale);
    }
    ctx.putImageData;
    if (mode == 'title') {
        ctx.globalAlpha = 1;
                ctx.fillStyle = 'darkslategrey';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = 'slategrey';
                ctx.fillRect(10, 10, width - 20, height - 20);
                ctx.drawImage(titleCard, 100, 150);
                ctx.font = "15px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Press Any Key", 600, 400);
    }
    if (mode == 'character creation') {
        drawSelectScreen();
    }
}



window.onresize = function () {
    scaleWindow();
}

let user = null;

const socket = io();
socket.on('greeting', function (data) { //4
    console.log(data.msg); //5
    id = data.id;
    socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client', id: id }); //6
});
let id;
let moving = false;
let oldRoom;
let oldPlayers;
let players;
let room;
let blocked = false;
let equip = 0;
let equippedItem = 0;
let updatePackage = {
    sent: true,
    character: { data: null, sent: true },
    room: { data: null, sent: true },
}
let updatePending = false;

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
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = 'slategrey';
                ctx.fillRect(10, 10, width - 20, height - 20);
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
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = 'slategrey';
                ctx.fillRect(10, 10, width - 20, height - 20);
                ctx.drawImage(titleCard, 100, 150);
                ctx.font = "15px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Press Any Key", 600, 400);
                clearInterval(titleFade);
            }
        }, 40);
    }
}






// let user = new User("Smiley", 10, 10, 100, 100);


function setUser() { }
function startGame() { }

function drawCanvas() {
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(10, 10, width - 20, height - 20);
    if (user != null) {
        console.log('user');
    } else {
        console.log('title');
        title();
    }
}


setInterval(function () {
    if (user != null) {
        ctx.fillStyle = 'darkslategrey';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = room.color;
        ctx.fillRect(10, 10, width - 20, height - 20);
        drawDoors();
        blocked = false;
        for (thing in players) {
            let current = players[thing];
            current = smoothMove(current);
            drawNinja(current);
            if (current.id != user.id) {
                if ((Math.abs(user.x - current.x) < 90) && (Math.abs(user.y - current.y) < 90)) {
                    damage(current.strength);
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
        if ((moving == true) && (updatePending == false)) {
            updatePackage.character = user;
            updatePackage.sent = false;
        }
        isMoving();
        travelCheck();
        itemCheck();
        if ((updatePackage.sent == false) && (updatePending == false)) {
            socket.emit('useraction', updatePackage);
            updatePending = true;
            updatePackage.sent = true;
        }
    }
}, 20);

function getUser() {
    if (user == null) {
        setUser();
    }
}

function init() {
    // getUser()
    scaleWindow();
    drawCanvas();
}

document.addEventListener('DOMContentLoaded', function () {
    init();
}, false);

socket.on('player accepted', function (data) {
    console.log('User Verified');
    user = data.user;
    updatePackage.character = user;
    players = data.players;
});

socket.on('game update', function (data) {
    oldRoom = room;
    oldPlayers = players;
    delete room;
    delete players;
    players = data.room.players;
    let userUpdate = data.room.players[user.id];
    user.hat = userUpdate.hat;
    user.inventory = userUpdate.inventory;
    user.keys = userUpdate.keys;
    user.speed = userUpdate.speed;
    user.health = userUpdate.health;
    user.strength = userUpdate.strength;
    user.bag = userUpdate.bag;
    user.bagTotal = userUpdate.bagTotal;
    user.keyRing = userUpdate.keyRing;
    user.keyTotal = userUpdate.keyTotal;
    room = data.room;
    user.room = data.room.id;
    updatePending = false;
    if (user.health < 0) {
        location.reload();
    }

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