import express from 'express';
import ws from 'ws';
import mongoose from 'mongoose';
import https from 'https';
import http from 'http';
import chatRouter from './chat/ChatRouter.js';
import { Server } from 'socket.io';

const PORT_WS = 5000;
const PORT_API = 4000;
const DB_URL =
  'mongodb+srv://user:user@cluster0.38sgbso.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

// message types:
// - chat_init
// - message

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('message', JSON.parse(message));
    let formattedMessage = JSON.parse(message);
    wsServer.clients.forEach(function each(client) {
      if (formattedMessage.type === 'chat_init') {
        http
          .get(`http://localhost:${PORT_API}/chat`, (resp) => {
            let data = '';
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              formattedMessage = JSON.parse(data);
            });
          })
          .on('error', (err) => {
            console.log('Error: ' + err.message);
          });
      }

      if (client.readyState === ws.OPEN) {
        setTimeout(function () {
          client.send(JSON.stringify(formattedMessage));
        }, 1000);
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
