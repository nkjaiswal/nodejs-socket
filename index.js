//https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Sent");
    io.sockets.emit(req.query.user, {message: req.query.message});
});

const server = app.listen(process.env.PORT || 3000);
const io = require("socket.io")(server);
var client = {};

io.on("connection", socket => {
    console.log("Request received from " + socket.handshake.query.user);
    if(socket.handshake.query.user == "ERROR") {
        socket.disconnect();
        return;
    }
    console.log("Connected to user: "+socket.handshake.query.user);
    socket.on("delete_message", function(delete_id){
        console.log("Deleted Message " + delete_id);
    });
    socket.on('ping_me', function(data){
        console.log("Ping received for " + socket.handshake.query.user);
        socket.emit('pong_me',socket.handshake.query.user);
    });
    socket.on('disconnect', function(){console.log("Disconnected " + socket.handshake.query.user)});
});
