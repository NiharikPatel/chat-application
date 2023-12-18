const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000/", "http://192.168.1.9:3000/"],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (message) => {
    console.log('Message received:', message);
    io.emit('receive_message', message);
  });
  socket.on('like_message', ({ messageId }) => {
    io.emit('message_liked', { messageId });
  });

  socket.on('disconnect', () => {

  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
