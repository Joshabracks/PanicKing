
document.addEventListener("keydown", e => {
    if (user != null) {
        push(e);
    }
});

document.addEventListener("keyup", e => {
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
        colorize();
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
        colorize();
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

function colorize() {
    if (select == 'body') {
        character.color = randomColor();
        drawSelectScreen();
    }
    if (select == 'eyes'){
        character.eyes = randomColor();
    }
    if (select == 'bandana') {
        character.bandana = randomColor();
    }
}