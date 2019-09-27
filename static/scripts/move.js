function move(object) {
    //MOVE UP
    if (object.up == true) {
        object.y -= object.speed;
        if (object.lookVert > -5) {
            object.lookVert--;
        }
    } else {
        if ((object.lookVert < 0) && (object.down == false)) {
            object.lookVert++;
        }
    }
    //MOVE DOWN
    if (object.down == true) {
        object.y += object.speed;

        if (object.lookVert < 5) {
            object.lookVert++;
        }
    } else {
        if ((object.lookVert > 0) && (object.up == false)) {
            object.lookVert--;
        }
    }
    //MOVE LEFT
    if (object.left == true) {
        object.x -= object.speed;
        if (object.lookHorz > -5) {
            object.lookHorz--;
        }
    } else {
        if ((object.lookHorz < 0) && (object.right == false)) {
            object.lookHorz++;
        }
    }
    //MOVE RIGHT
    if (object.right == true) {
        object.x += object.speed;
        if (object.lookHorz < 5) {
            object.lookHorz += 1;
        }
    } else {
        if ((object.lookHorz > 0) && (object.left == false)) {
            object.lookHorz--;
        }
    }

    if (object.x < 55) {
        object.x = 55;
    }
    if (object.x > 745) {
        object.x = 745;
    }
    if (object.y < 55) {
        object.y = 55;
    }
    if (object.y > 545) {
        object.y = 545;
    }

}


function bounce() {
    for (player in players) {
        if (players[player].id != user.id) {
            let current = players[player];
            if (current.x > user.x) {
                user.x -= user.speed + 1;
            }
            if (current.x < user.x) {
                user.x += user.speed + 1;
            }
            if (current.y > user.y) {
                user.y -= user.speed + 1;
            }
            if (current.y < user.y) {
                user.y += user.speed + 1;
            }
            move(user);
            updatePackage.character = user;
            updatePackage.sent = false;
        }
    }
}

function damage(strength){
    user.health -= strength/10;
}

function travelCheck() {
    if (room.north.door.exists == true) {
        if ((user.y < 64) && (user.x > 350 ) && (user.x < 450) && (user.up == true)) {
            // user.up = false;
            moving = false;
            let oldId = room.id;
            let id = room.north.id.x + ":" + room.north.id.y;
            user.y = 540;
            user.room = id;
            socket.emit('change rooms', {character: user, id: oldId})
        }
    }
    if (room.south.door.exists == true) {
        if ((user.y > 540) && (user.x > 350 ) && (user.x < 450) && (user.down == true)) {
            // user.down = false;
            moving = false;
            let oldId = room.id;
            let id = room.south.id.x + ":" + room.south.id.y;
            user.y = 70;
            user.room = id;
            socket.emit('change rooms', {character: user, id: oldId})
        }
    }
    if (room.east.door.exists == true) {
        if ((user.x > 734) && (user.y > 250 ) && (user.y < 350) && (user.right == true)) {
            // user.right = false;
            moving = false;
            let oldId = room.id;
            let id = room.east.id.x + ":" + room.east.id.y;
            user.x = 70;
            user.room = id;
            socket.emit('change rooms', {character: user, id: oldId})
        }
    }
    if (room.west.door.exists == true) {
        if ((user.x < 64) && (user.y > 250 ) && (user.y < 350) && (user.left == true)) {
            // user.left = false;
            moving = false;
            let oldId = room.id;
            let id = room.west.id.x + ":" + room.west.id.y;
            user.x = 725;
            user.room = id;
            socket.emit('change rooms', {character: user, id: oldId})
        }
    }
}