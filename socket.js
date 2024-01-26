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
    // parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
    // const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    // let token = cookies?.accessToken; // get the accessToken
    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // decode the token

    // const user = await User.findById(decodedToken?._id).select(
    //   "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    // );
    // retrieve the user
    // if (!user) {
    //   throw new ApiError(401, "Un-authorized handshake. Token is invalid");
    // }
    // socket.user = user; // mount te user object to the socket

    socket.on("newUser", (data) => {
      addSocketUser(data?.id, socket.id);
    });

    socket.on("notifications", (data) => {
      const socketUser = getSocketUser(data?.toUserId);
      if (socketUser) io.to(socketUser.socketId).emit("showNotification", data);
    });

    socket.on("messages", (data) => {
      console.log("messages data: " + JSON.stringify(data));
      console.log("messages data: " + data.message);
      const socketUser = getSocketUser(data?.senderId); // change to receiver id
      if (socketUser) io.to(socketUser.socketId).emit("messages", data);
    });

    socket.on("disconnect", () => {
      console.log("disconnecting ", socket.id);
      removeSocketUser(socket.id);
    });
  });
};
