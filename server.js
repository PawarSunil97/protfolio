require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const smsRoutes = require("./route/smsRoutes");
const contactRoute = require("./route/contactRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api", contactRoute);
app.use("/sms", smsRoutes);

// ---- Socket.IO ----
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

global.userMap = {}; // { socketId: { socket, name, phone } }
global.io = io;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", ({ name, phone }) => {
    global.userMap[socket.id] = { socket, name, phone };
    console.log(`User registered: ${name} (${phone})`);
  });

  socket.on("disconnect", () => {
    delete global.userMap[socket.id];
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`✅ Server running on port ${port}`));
