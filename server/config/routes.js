const main = require("../controllers/main");

module.exports = function (app) {
    app.get('/', function (req, res) { main.index(req, res) });
}