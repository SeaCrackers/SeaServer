"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomEvents_1 = require("./RoomEvents");
var Server = require("socket.io").Server;
require('dotenv').config();
var port = process.env.PORT || 3000;
var io = new Server({
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    console.log("Client " + socket.id + " connected");
    socket.on(RoomEvents_1.RoomEvents.Join, function (roomName) {
        socket.join(roomName);
        console.log("Client " + socket.id + " joined room " + roomName);
    });
    socket.on(RoomEvents_1.RoomEvents.Leave, function (roomName) {
        socket.leave(roomName);
        console.log("Client " + socket.id + " leaved room " + roomName);
    });
    socket.on(RoomEvents_1.RoomEvents.Broadcast, function (roomName, args) {
        socket.to(roomName).emit(RoomEvents_1.RoomEvents.Broadcast, args);
        console.log("Client " + socket.id + " broadcasted message to room " + roomName);
    });
    socket.on("disconnect", function () {
        console.log("Client " + socket.id + " disconnected");
    });
});
io.listen(port);
console.log('Server listening on port ' + port);
