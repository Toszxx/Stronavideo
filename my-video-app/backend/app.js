const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { WebSocketServer } = require("ws");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// WebSocket server
const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

// API routes
const videoRoutes = require("./routes/videoRoutes");
app.use("/api/videos", videoRoutes);

// Start server with WebSocket upgrade
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit("connection", ws, request);
    });
});
