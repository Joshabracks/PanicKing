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

function Hat() {
    this.type;
    this.effect;
    this.image;
}