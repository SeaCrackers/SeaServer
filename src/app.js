const { Server } = require("socket.io");
require('dotenv').config()

const port = process.env.PORT || 3000;

const io = new Server({
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log('New client connected');
    socket.on("hello", (anotherSocketId, msg) => {
        console.log("Hello from client!")
        socket.emit("hello");
    });
});

io.listen(port);
console.log('Server listening on port '+port)