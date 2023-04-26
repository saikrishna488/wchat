const express = require("express");
const app = express();
//port
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
//using cors
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // allow to connect from any origin
    methods: ["GET", "POST"],
  },
});
let users = [];
let randoms = [];
let room = null;
let conn = [];

const ran = (length) => {
  return Math.floor(Math.random() * length);
};

io.on("connection", (socket) => {
  //connect randoms
  socket.on("connect-ran", async (data) => {
    randoms.push(socket.id);
    console.log(randoms);
    io.emit("online", randoms.length);
    if (room && room != socket.id && randoms.length>1) {
      socket.join(room + 4);
      console.log("user joined the room",room);
      let data = {
        msg: "you are connected with stranger",
        token:4,
        room,
      };
      conn.push({
        user1: room,
        user2: socket.id,
      });
      io.in(room + 4).emit("status", data);

      room = null;
    } else {
      room = socket.id;
      socket.join(room + 4);
      console.log("waiting for stranger",room);
      let data = {
        msg: "waiting for stranger",
        token : 2,
        room,
      };
      io.in(room + 4).emit("status", data);
    }
  });

  socket.on("random-msg", ({ msg, room }) => {
    console.log(msg, room);
    socket.broadcast.to(room + 4).emit("random-receive", msg);
  });

  // join room
  socket.on("joinRoom", (data) => {
    users.push({
      id: socket.id,
      username: data.username,
      room: data.room,
    });
    let arr = users.filter((user) => user.room == data.room);
    console.log(arr);
    socket.join(data.room);
    arr ? io.in(data.room).emit("users-all", arr) : null;
    console.log(users);
    io.in(data.room).emit(
      "user-joined",
      data.username + " has joined the chat"
    );
  });

  socket.on("message", (data) => {
    let room = users.find((user) => user.username === data.username);
    if (room) {
      socket.broadcast.to(room.room).emit("new-message", {
        username: room.username ? room.username : "user-unknown",
        message: data.message,
      });
    }
    // socket.emit('users',users);
  });

  socket.on("disconnect", () => {
    // let ran = users.find(user => user == socket.id);
    let room = users.find((user) => user.id == socket.id);
    if (room) {
      socket.broadcast.to(room.room).emit("new-message", {
        username: room.username ? room.username : "user-unknown",
        message: "user left the chat",
      });
      users = users.filter((user) => user.id !== socket.id);
      let arr = users.filter((user) => user.room == room.room);
      io.in(room.room).emit("users-left", arr);
      console.log(users);
    }
    if (randoms.includes(socket.id)) {
      randoms = randoms.filter((user) => user !== socket.id);
      let room = conn.filter((room) => {
        if (room.user1 == socket.id || room.user2 == socket.id) {
          return room;
        }
      });
      conn = conn.filter((room) => {
        if (room.user1 !== socket.id && room.user2 !== socket.id) {
          return room;
        }
      });
      io.emit("online", randoms.length);
      let data = {
        msg: "stranger left the chat",
        token:4,
        room: socket.id,
      };

      room.length > 0 && io.in(room[0].user1 + 4).emit("status", data) ;
      console.log(conn);
      console.log(randoms);
    }
  });
});

app.get("/", (req, res) => {
  res.send("backend !!!!");
});

server.listen(port, () =>
  console.log("Server has been started on port " + port)
);
