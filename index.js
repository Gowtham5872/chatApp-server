import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import router from "./api/routes.js";
import sockets from "./socket/sockets.js";

await mongoose.connect(
  "mongodb+srv://gowtham:gowtham@cluster0.gvlvfma.mongodb.net/test"
);

const app = express();
const PORT = 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000","https://chipper-blancmange-77508a.netlify.app"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ["http://localhost:3000","https://chipper-blancmange-77508a.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use("/", router);

io.on("connection", sockets);

httpServer.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
