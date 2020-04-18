//https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt
const express = require('express');
const app = express();

var msgs = {};
var i = 0;

app.get('/', (req, res) => {
    res.send("Sent");
    // io.sockets.emit('page', {a:1, b:2});
    if(client.user1) {
        msgs[i] = {id: i, last_client: true};
        client.user1.emit('page', {id: i, last_client: true});
        i++;
    }
});

const server = app.listen(process.env.PORT || 3000);
const io = require("socket.io")(server);
var client = {};

io.on("connection", socket => {
    client[socket.handshake.query.user] = socket;
    for(p in msgs) {
        socket.emit("page", msgs[p]);
    }
    msgs = {};
    console.log("Connected");
    console.log(socket.handshake.query);
    socket.on("delete_message", function(delete_id){
        delete msgs[delete_id.id];
        console.log("Deleted Message " + delete_id.id);
    });
});
