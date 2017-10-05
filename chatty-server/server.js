// server.js

const express       = require('express');
const SocketServer  = require('ws').Server;
const WebSocket     = require('ws');
const uuidv1        = require('uuid/v1')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
function broadcast(data) {
  // console.log(data);
  for (client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      if (data.type === 'incomingMessage') {
        client.send(JSON.stringify(data));
        console.log("Message sent")
      } else if (data.type === 'postNotification') {
        client.send(JSON.stringify(data));
        console.log("Server message sent");
      }
    }
  }
}

function broadcastClientSize(size) {
  for (client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(size);
    }
  }
}

function handleMessage(data, random) {
  let jsonified = JSON.parse(data);
  if (jsonified.type === 'postNotification') {
    jsonified.id = uuidv1();
    jsonified.content = jsonified.currName + ' has changed name to ' + jsonified.newName;
    broadcast(jsonified);
  } else {
    jsonified.id = uuidv1();
    jsonified.type = 'incomingMessage';
    jsonified.color = random;
    broadcast(jsonified);
  }
}

function handleConnection(client) {
  console.log('Client connected');
  console.log('We are at ' + wss.clients.size + ' clients!');
  broadcastClientSize(wss.clients.size);
  const random = Math.floor(Math.random() * 4) + 1;
  client.on('message', (data) => {
    handleMessage(data, random);
  })
  client.on('close', () => {
    console.log('Client disconnected');
    broadcastClientSize(wss.clients.size);
  })
}

wss.on('connection', handleConnection);