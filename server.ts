import { WebSocketServer, WebSocket } from "ws";

const port = 3000;

const wss = new WebSocketServer({ port });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("message", (msg) => {
    console.log("Received message from client", msg);
    clients.forEach((client) => {
      if (client != ws && client.readyState == WebSocket.OPEN) client.send(msg);
    });
  });
});

console.log("Listening on ", port);
