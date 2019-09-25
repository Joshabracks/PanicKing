module.exports = function () {

    function Room(xCoord, yCoord) {
        this.location = { x: xCoord, y: yCoord };
        //CONNECTED ROOMS BY THEIR COORDINATES
        this.north = {
            id: { x: this.location.xCoord, y: this.location.yCoord - 1 },
        };
        this.south = {
            id: { x: this.location.xCoord, y: this.location.yCoord + 1 }
        };
        this.east = {
            id: { x: this.location.xCoord + 1, y: this.location.yCoord }
        };
        this.west = {
            id: { x: this.location.xCoord, y: this.location.yCoord - 1 }
        };
        //CONTAINERS WITHIN THIS ROOM || RANDOMLY GENERATED
        this.containers = {};
        this.players = [];
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
    function SpikedHelmet(player) {
        this.player = player;
        this.image = "spikedHelmet.svg";
        this.effect = () => {
            this.player.strength += 3;
        }
    }

    // Speed Hat
    function SpeedHat(player) {
        this.player = player;
        this.image = "speedHat.svg";
        this.effect = () => {
            this.player.speed += 3;
        }
    }

    // JugHat
    function helmet(player) {
        this.player = player;
        this.image = "helmet.svg";
        this.effect = () => {
            this.player.health += 20;
        }
    }

    // Crown
    function Crown(player) {
        this.player = player;
        this.image = "crown.svg";

        this.effect = () => {
            this.player.strength += 3;
            this.player.speed += 3;
            this.player.health += 20;
        }
    }

}