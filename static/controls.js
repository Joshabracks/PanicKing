document.addEventListener("keydown", e => {
    // console.log(e);
    if (e.keyCode == 87) {
        //W => UP
        user.up = true;
    }
    else if (e.keyCode == 65) {
        //A => LEFT
        user.left = true;
    }
    else if (e.keyCode == 83) {
        //S => DOWN
        user.down = true;
    }
    else if (e.keyCode == 68) {
        //D => RIGHT
        user.right = true;
    }
    else if (e.keyCode == 32) {

        console.log("space");
    }
});

document.addEventListener("keyup", e => {
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
});