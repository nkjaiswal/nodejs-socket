var socket = require('socket.io-client')('https://socket-nodejs-test.herokuapp.com/', {
    query: {user: process.argv[2]}
});

// var socket = require('socket.io-client')('http://localhost:3000', {
//     query: {user: process.argv[2]}
// });

socket.on('connect', function(){console.log("Connected")});
socket.on('page', function(data){
    console.log(data);
    socket.emit("delete_message",{id:data.id});
});
socket.on('disconnect', function(){});
console.log(process.argv[2]);