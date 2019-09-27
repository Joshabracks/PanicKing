let crown = new Image(41.364, 41.364);
crown.src = "images/crown.svg";

function drawNinja(ninja) {
    ctx.fillStyle = ninja.color;
    ctx.beginPath();
    ctx.arc(ninja.x, ninja.y, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = ninja.bandana;
    ctx.lineWidth = 2;
    ctx.fillRect(ninja.x-47, ninja.y-25, 95, 30);
    ctx.strokeRect(ninja.x-47, ninja.y-25, 95, 30);
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(ninja.x, ninja.y, 50, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    if (ninja.health < 50) {
        ctx.strokeStyle = "rgb(" + (Math.floor((50 - ninja.health) * 5.1)) + ", 0, 0)";
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(ninja.x+15, ninja.y - 25, 20, 20);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillRect(ninja.x-35, ninja.y - 25, 20, 20);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = ninja.eyes;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(ninja.x - 25 + ninja.lookHorz, ninja.y - 15 + ninja.lookVert, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(ninja.x + 25 + ninja.lookHorz, ninja.y - 15 + ninja.lookVert, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(ninja.x + 15, ninja.y - 25, 20, 20);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeRect(ninja.x-35, ninja.y - 25, 20, 20);
    ctx.closePath();
    if (ninja.hat) {
        let img = new Image(ninja.hat.width, ninja.hat.height);
        img.src = ninja.hat.image;
        ctx.drawImage(img, ninja.x-ninja.hat.drawLoc.x, ninja.y-ninja.hat.drawLoc.y);
    }
}


function drawSelectScreen(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Body", 300, 100);
    ctx.fillText("Eyes", 300, 200);
    ctx.fillText("Bandana", 300, 300);
    ctx.fillText("Join the Panic!!!", 300, 400);
    ctx.font = "15px Arial"
    ctx.fillText("MOVE: WASD | SELECT : SPACEBAR", 15, 585);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    if (select == 'body') {
        ctx.fillText("Body", 300, 100);
    } else if (select == 'eyes') {
        ctx.fillText("Eyes", 300, 200);
    } else if (select == 'bandana') {
        ctx.fillText("Bandana", 300, 300);
    } else if (select == 'join') {
        ctx.fillText("Join the Panic!!!", 300, 400);
    }
    drawNinja(character);
}

function drawDoors() {
    if (room.north.door.exists == true) {
        ctx.fillStyle = 'slategrey';
        ctx.fillRect(350, 0, 100, 20);
    }
    if (room.south.door.exists == true) {
        ctx.fillStyle = 'slategrey';
        ctx.fillRect(350, 580, 100, 20);
    }
    if (room.east.door.exists == true) {
        ctx.fillStyle = 'slategrey';
        ctx.fillRect(780, 250, 20, 100);
    }
    if (room.west.door.exists == true) {
        ctx.fillStyle = 'slategrey';
        ctx.fillRect(0, 250, 20, 100);
    }
}