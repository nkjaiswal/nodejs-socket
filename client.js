var socket = require('socket.io-client')('http://localhost:3000', {
    query: {user: process.argv[2]}
});
socket.on('connect', function(){});
socket.on('page', function(data){console.log(data);});
socket.on('disconnect', function(){});
console.log(process.argv[2]);