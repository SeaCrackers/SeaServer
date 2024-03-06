import {Server} from "socket.io";
import {RoomEvents} from "./room-events";
require('dotenv').config()

const port : number =  parseInt(process.env.PORT) || 3000;

const io : Server = new Server({
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Client " + socket.id + " connected");
    socket.on(RoomEvents.Join, (roomName : string) => {
        socket.join(roomName);
        console.log("Client " + socket.id + " joined room " + roomName);
    });
    socket.on(RoomEvents.Leave,  (roomName : string) => {
        socket.leave(roomName);
        console.log("Client " + socket.id + " leaved room " + roomName);
    });
    socket.on(RoomEvents.Broadcast,  (broadcast : {room : string, content : any}) => {
        socket.to(broadcast.room).emit(RoomEvents.Broadcast, broadcast.content);
        console.log("Client " + socket.id + " broadcast message to room " + broadcast.room);
    });
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected");
    });
});

io.listen(port);
console.log('Server listening on port ' + port);