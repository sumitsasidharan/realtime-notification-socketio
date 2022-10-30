import { Server } from "socket.io";

const io = new Server({
   cors: {
      origin: "http://localhost:3000"
   }
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
   // if user isn't online, or doesn't exit, then add/push onto the array
   !onlineUsers.some(user => user.username === username) && onlineUsers.push({username, socketId});
}

const removeUser = (socketId) => {
   onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (username) => {
   return onlineUsers.find(user => user.username === username);
}

// when connection is established
io.on('connection', (socket) => {
   // take event from client
   socket.on('newUser', (username) => {
      addNewUser(username, socket.id);
   })

   // send to everyone
   io.emit('firstEvent', 'just testing')

   // send to specific 
   io.to('').emit('firtEvent', 'hey whats up?');

   socket.on('disconnect', () => {
      // console.log('someone disconnected')
      removeUser(socket.id);
   })
});


io.listen(5000);

// 47.14