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
    
    drawCanvas();
}