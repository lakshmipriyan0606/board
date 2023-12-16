// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
  },
});

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on("board_update", (updatedBoard) => {
    socket.broadcast.emit("board_updated", updatedBoard);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected: ", socket.id);
  });
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
