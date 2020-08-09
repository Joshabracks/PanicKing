var colors = [];
var cceyes, ccbody, ccbandana;
function generateColor() {
    for (let i = 0; i < 20; i++) {
        colors.push(randomColor())
    }
    cceyes = Math.floor(Math.random() * (colors.length - 1))
    ccbody = Math.floor(Math.random() * (colors.length - 1))
    ccbandana = Math.floor(Math.random() * (colors.length - 1))
}

generateColor();


function randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}