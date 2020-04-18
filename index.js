//https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Sent");
    io.sockets.emit('page', {a:1, b:2});
    client.user1.emit('page', {last_client: true});
});

const server = app.listen(3000);
const io = require("socket.io")(server);
var client = {};

io.on("connection", socket => {
    client[socket.handshake.query.user] = socket;
    console.log("Connected");
    console.log(socket.handshake.query);
    // console.log(socket);
});