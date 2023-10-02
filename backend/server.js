import express from 'express';
import ws from 'ws';
import mongoose from 'mongoose';
import chatRouter from './chat/ChatRouter.js';
import { Server } from 'socket.io';
import { get, post } from './request.js';

const HOST = 'localhost';
const PATH = '/chat';
const PORT_WS = 5000;
const PORT_API = 4000;
const DB_URL =
  'mongodb+srv://user:user@cluster0.38sgbso.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('message', JSON.parse(message));
    let formattedMessage = JSON.parse(message);
    wsServer.clients.forEach(async function each(client) {
      if (formattedMessage.type === 'chat_init') {
        formattedMessage = await get(HOST, PATH);
        client.send(JSON.stringify(formattedMessage));
        return;
      }

      if (client.readyState === ws.OPEN) {
        post(HOST, PATH, formattedMessage);
        client.send(JSON.stringify(formattedMessage));
      }
    });
  });
});

const server = app.listen(PORT_WS, () => {
  console.log(`Example app listening at http://localhost:${PORT_WS}`);
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request);
  });
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT_API, () => console.log('Server Started On ' + PORT_API));
  } catch (error) {
    console.log;
  }
}

startApp();
