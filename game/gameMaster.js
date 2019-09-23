const messages = [];

io.on('connection', function (socket){
    socket.emit('greeting', {msg: 'PanicKing: Conneted.'});
    socket.on('thankyou', function (data){
        console.log(data.msg);
    });
    socket.on('useraction', function (data){
        //UPDATE GAMESTATE AND BROADCAST TO ALL USERS
    })


},);
