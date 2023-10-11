import express from 'express';
import ws from 'ws';
import mongoose from 'mongoose';
import cors from 'cors';
import chatRouter from './chat/ChatRouter.js';
import userRouter from './user/UserRouter.js';
import { Server } from 'socket.io';
import { get, post, remove } from './chat/ChatRequest.js';

const HOST = 'localhost';
const CHAT_PATH = '/chat';
const USER_PATH = '/user';
const PORT_WS = 5000;
const PORT_API = 4000;
const DB_URL =
  'mongodb+srv://user:user@cluster0.38sgbso.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/chat', chatRouter);
app.use('/user', userRouter);

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const formattedMessage = JSON.parse(message);

    wsServer.clients.forEach(async function each(client) {
      if (formattedMessage.type === 'chat_init') {
        const initMessages = await get(HOST, CHAT_PATH);
        client.send(JSON.stringify(initMessages));
        return;
      }

      if (formattedMessage.type === 'message_remove') {
        const removedMessage = await remove(
          HOST,
          CHAT_PATH,
          formattedMessage._id
        );
        client.send(
          JSON.stringify({ ...removedMessage, type: 'message_remove' })
        );
        return;
      }

      if (client.readyState === ws.OPEN) {
        const messageFromDB = await post(HOST, CHAT_PATH, formattedMessage);
        client.send(JSON.stringify(messageFromDB));
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
