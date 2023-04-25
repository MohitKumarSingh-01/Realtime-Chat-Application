// <-------USE NPM Package (EXPRESS, HTTP, SOCKET.IO)--------->

const express = require('express');
const app = express();
const http = require('http').createServer(app);


// <-------PORT SETUP--------->

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
});

// <-------All static file setup that are present in PUBLIC folders--------->

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// <-------Socket Setup--------->

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("Connected");
    socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
    })
});