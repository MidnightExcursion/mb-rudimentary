// -------------------------------------------------

// Native Package | HTTP
const http = require('http');

// External Package | Express
const express = require('express');

// External Package | ws
const WebSocket = require('ws');

// -------------------------------------------------

// (1): Import the required WebSocket logic:
const { handleConnection } = require('./websocket/websocketLogic');

// (2): Set up an Express server:
const expressServer = express();

// (3): Pass the Express application to an HTTP server:
const httpServer = http.createServer(expressServer);

// (4): Set up a WebSocket Server using the HTTP serveer:
const WebSocketServer = new WebSocket.Server({ server: httpServer });

DEVELOPMENT_PORT = 8080

// (5): Initialize an empty matchmaking queue:
let matchmakingQueue = [];

// (6): Listen to any WS connections:
WebSocketServer.on('connection', (websocket) => {
    console.log(`> New connection detected`);

    // (6.1): Now, perform logic with the connected WS:
    handleConnection(websocket, matchmakingQueue);
});

httpServer.listen(DEVELOPMENT_PORT, () => {
    console.log(`Server is listening on port ${DEVELOPMENT_PORT}`);
});
