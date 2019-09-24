function Room(xCoord, yCoord){
    this.location = {x: xcoord,y: ycoord};
    //CONNECTED ROOMS BY THEIR COORDINATES
    this.north = {
        id = {x: this.xCoord, y: this.yCoord - 1},
    };
    this.south = {
        id = {x: this.xCoord, y: this.yCoord + 1}
    };
    this.east = {
        id = {x: this.xCoord + 1, y: this.yCoord}
    };
    this.west = {
        id = {x: this.xCoord, y: this.yCoord - 1}
    };
    //CONTAINERS WITHIN THIS ROOM || RANDOMLY GENERATED
    this.containers = {};
    this.brokenDoors = ['north', 'south', 'east', 'west'];
}

function Container() {
    this.type;
    this.room;
    this.contents;
    this.location;
    this.image;
}

// Strength Hat
class StrHat {
    player;
    img;

    constructor(player) {
        this.player = player;
        // make img whatever you want for strHat this.img = ?
    }

    effect(){
        this.player.strength += 3;
    }
    
}

// Speed Hat
class SpdHat {
    player;
    img;

    constructor(player) {
        this.player = player;
        // this.img = ?
    }

    effect(){
        this.player.speed += 3;
    }
    
}

// JugHat
class JugHat {
    player;
    img;

    constructor(player) {
        this.player = player;
        // this.img = ?
    }

    effect(){
        this.player.health += 20;
    }
    
}

// Crown
class Crown {
    player;
    img;

    constructor(player) {
        this.player = player;
        // this.img = ?
    }

    effect() {
        this.player.strength += 3;
        this.player.speed += 3;
        this.player.health += 20;
    }
}

