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

    if (object.x < 65) {
        object.x = 65;
    }
    if (object.x > 735) {
        object.x = 735;
    }
    if (object.y < 65) {
        object.y = 65;
    }
    if (object.y > 535) {
        object.y = 535;
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
        }
    }
}