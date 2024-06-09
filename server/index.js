import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const roomUsers = {};
io.on("connection", (socket) => {
  socket.on("room", ({ room, username }) => {
    const usernameTaken =
      roomUsers[room] && roomUsers[room].find((i) => i.username == username);
    if (usernameTaken) {
      socket.emit("error", "Username is already taken");
      return;
    }
    roomUsers[room] = [...(roomUsers[room] || []), { username, id: socket.id }];
    socket.emit("roomJoined", { room, username });
    socket.join(room);
  });
  socket.on("message", (data) => {
    socket.to(data.room).emit("messageReturn", data);
  });

  socket.on("disconnect", () => {
    Object.keys(roomUsers).forEach((room) => {
      roomUsers[room] = roomUsers[room].filter((i) => i.id !== socket.id);
    });
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log("server is running on port :5000");
});
