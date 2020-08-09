const express = require('express'), app = express(), session = require('express-session'); 
app.use(express.static(__dirname + "/static")); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({secret: 'keyboardkitteh', resave: false, saveUninitialized: true, cookie: { maxAge: null }})); 
app.use("/socket", express.static(__dirname + "/node_modules/socket.io-client/dist"));
require('./server/config/routes')(app); 
const server = app.listen(1337); 
const io = require('socket.io')(server);
require('./game/testMaster')(io);


// require('./game/gameMaster');