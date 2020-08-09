
document.addEventListener("keydown", e => {
    if (user != null) {
        push(e);
    }
});

document.addEventListener("keyup", e => {
    console.log(e);
    if (user != null) {
        release(e);
    } else if (mode == 'title') {
        mode = 'character creation';
        createCharacter();
    } else if (mode == 'character creation') {
        creationControls(e);
    }
});

function push(e) {
    // console.log(e);
    if (e.keyCode == 87) {
        //W => UP
        user.up = true;
        moving = true;
    }
    else if (e.keyCode == 65) {
        //A => LEFT
        user.left = true;
        moving = true;
    }
    else if (e.keyCode == 83) {
        //S => DOWN
        user.down = true;
        moving = true;
    }
    else if (e.keyCode == 68) {
        //D => RIGHT
        user.right = true;
        moving = true;
    }
    else if (e.keyCode == 32) {
        console.log("space");
    }
}

function release(e) {
    if (e.keyCode == 87) {
        //W => UP
        user.up = false;
    }
    else if (e.keyCode == 65) {
        //A => LEFT
        user.left = false;
    }
    else if (e.keyCode == 83) {
        //S => DOWN
        user.down = false;
    }
    else if (e.keyCode == 68) {
        //D => RIGHT
        user.right = false;
    }
    else if (e.keyCode == 32) {

        console.log("space");
    }
    else if (e.keyCode == 69) {
        changeEquip(1);
        //E => SHUFFLE ITEMS RIGHT
    }
    else if (e.keyCode = 81) {
        changeEquip(-1);
        //Q => SHUFFLE ITEMS LEFT
    }
}

function creationControls(e) {
    if (e.keyCode == 87) {
        //W => UP
        if (select == 'body') {
            select = 'join';
        } else if (select == 'join') {
            select = 'bandana';
        }
        else if (select == 'bandana') {
            select = 'eyes';
        }
        else if (select == 'eyes') {
            select = 'body';
        }
    }
    else if (e.keyCode == 65) {
        //A => LEFT
        colorize(-1);
    }
    else if (e.keyCode == 83) {
        //S => DOWN
        if (select == 'body') {
            select = 'eyes';
        } else if (select == 'eyes') {
            select = 'bandana';
        }
        else if (select == 'bandana') {
            select = 'join';
        }
        else if (select == 'join') {
            select = 'body';
        }
    }
    else if (e.keyCode == 68) {
        //D => RIGHT
        colorize(1);
    }
    else if (e.keyCode == 32) {
        //SPACE
        if (select == 'join') {
            mode = 'loading';
            joinGame();
        }
    }
    drawSelectScreen();
}

function colorize(inc) {
    if (select == 'body') {
        ccbody += inc;
        if (ccbody < 0) {
            ccbody = colors.length - 1;
        }
        if (ccbody >= colors.length) {
            ccbody = 0;
        }
        character.color = colors[ccbody];
    }
    if (select == 'eyes'){
        cceyes += inc;
        if (cceyes < 0) {
            cceyes = colors.length - 1;
        }
        if (cceyes >= colors.length) {
            cceyes = 0;
        }
        character.eyes = colors[cceyes];
    }
    if (select == 'bandana') {
        ccbandana += inc;
        if (ccbandana < 0) {
            ccbandana = colors.length - 1;
        }
        if (ccbandana >= colors.length) {
            ccbandana = 0;
        }
        character.bandana = colors[ccbandana];
    }
}