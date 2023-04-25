const express = require('express');
const app = express();
//port
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
//using cors
app.use(cors());

const io = new Server(server,{
    cors: {
        origin: '*', // allow to connect from any origin
        methods: ["GET", "POST"]
    }
});
let users = [];

io.on('connection', (socket) => {
    socket.on('joinRoom', (data)=>{
        users.push({
            id: socket.id,
            username :data.username,
            room : data.room
        });
        socket.join(data.room)
        io.in(data.room).emit('users-all',users);
        console.log(users);
        io.in(data.room).emit('user-joined', data.username+" has joined the chat");
    })

    socket.on('message',(data)=>{
        let room = users.find(user => user.username === data.username);
        if(room){
            socket.broadcast.to(room.room).emit('new-message', {
                username : room.username ? room.username : "user-unknown",
                message : data.message
            });
        }
        // socket.emit('users',users);
    });

    socket.on("disconnect", () => {
        let room = users.find(user => user.id == socket.id);
        if(room){
            socket.broadcast.emit('new-message', {
                username : room.username ? room.username : "user-unknown",
                message : "user left the chat"
            });
            users = users.filter(user => user.id !== socket.id);
            io.in(room.room).emit('users-left',users);
            console.log(users);
        }
    });
});

app.get('/',(req,res)=>{
    res.send("backend !!!!"):
});

server.listen(port, ()=> console.log("Server has been started on port "+ port));
