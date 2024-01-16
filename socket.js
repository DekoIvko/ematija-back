const socketIO = require("socket.io");

let socketUsers = [];

const addSocketUser = (userId, socketId) => {
  !socketUsers.some((user) => user.userId === userId) && socketUsers.push({ userId, socketId });
};

const removeSocketUser = (socketId) => {
  socketUsers = socketUsers.filter((user) => user.socketId !== socketId);
};

const getSocketUser = (userId) => {
  return socketUsers.find((user) => user.userId === userId);
};

module.exports = (server) => {
  console.log("Running socket.io server");
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("connected ", socket.id);

    socket.on("newUser", (data) => {
      addSocketUser(data?.id, socket.id);
    });

    socket.on("notifications", (data) => {
      const socketUser = getSocketUser(data?.toUserId);
      if (socketUser) io.to(socketUser.socketId).emit("showNotification", data);
    });

    socket.on("messages", (data) => {
      console.log("messages: " + socket.id);
    });

    socket.on("disconnect", () => {
      console.log("disconnecting ", socket.id);
      removeSocketUser(socket.id);
    });
  });
};
