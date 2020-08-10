const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true });
const fs = require('fs');
const path = require('path');
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require('./../models/' + file);
    }
}); 