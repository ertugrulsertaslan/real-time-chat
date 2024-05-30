import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("room", (data) => {
    socket.join(data);
  });
  socket.on("message", (data) => {
    socket.to(data.room).emit("messageReturn", data);
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log("server is running on port :5000");
});
