//create SVG Element

var svgns = "http://www.w3.org/2000/svg";
var circle = document.createElementNS(svgns, 'circle');

var ninja = document.createElement('SVG');
ninja.setAttribute('width', "72");
ninja.setAttribute('height', '72');
ninja.setAttribute('version', '1.1');
ninja.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
ninja.appendChild(circle);

var test = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

// var socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function User(name, image, x, y, width, height) {
    this.name = name;
    this.image = new Image();
    this.image.src = image;
    this.image.type = "image/svg+xml";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.speed = 5;
    this.eyes = "black";
    this.color = "#58595B";
    this.bandana = "red";
    this.lookHorz = 0;
    this.lookVert = 0;
}

let user = new User("Smiley", "/images/ninja.svg", 10, 10, 100, 100);

function setUser() { }
function startGame() { }

function drawCanvas() {
    ctx.fillStyle = 'darkslategrey';
    ctx.fillRect(10, 10, canvas.width, canvas.height);
    drawNinja(user);
}


setInterval(function () {
    move(user);
}, 20);

function getUser() {
    if (user == null) {
        setUser();
    } else {
        startGame(user);
    }
}

function init() {
    // getUser();
    drawCanvas();
}

document.addEventListener('DOMContentLoaded', function () {
    init();
}, false);