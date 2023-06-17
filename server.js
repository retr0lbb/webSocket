const http = require('http')
const express = require('express');
const WebSocket = require("ws");

const app = express();
const PORT = 6969

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })


wss.on("connection", (ws) =>{
    ws.on("message", (data) =>{
         wss.clients.forEach(client =>{
            if(client !== ws && client.readyState === WebSocket.OPEN){
                const sender = client === ws ? "eu" : "outro";
                client.send(`${sender} ${data}`);
            }
         })
    })
})


server.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
})