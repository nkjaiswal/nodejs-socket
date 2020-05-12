var socket = require('socket.io-client')('https://socket-nodejs-test.herokuapp.com/', {
    query: {user: process.argv[2]}
});

// var socket = require('socket.io-client')('http://localhost:3000', {
//     query: {user: process.argv[2]}
// });

socket.on('connect', function(){console.log("Connected")});
socket.on(process.argv[2], function(data){
    console.log(data);
    socket.emit("delete_message",data);
});
socket.on('disconnect', function(){console.log("Disconnected")});
console.log(process.argv[2]);

function ping() {
    setTimeout(function(){ 
        console.log("Pinged");
        socket.emit('ping',{});
        ping();
    }, 3000);
}
ping();
