module.exports = function (io) {
  io.on("connection", (socket) => {
    const { userId, role } = socket.handshake.query || {};
    console.log(`[CONNECTED] ${role} (${userId}) - ${socket.id}`);

    socket.on("offer", ({ targetId, offer }) => {
      console.log(`[OFFER] from ${socket.id} to ${targetId}`);
      io.emit("offer", { offer, senderId: socket.id });
    });

    socket.on("answer", ({ targetId, answer }) => {
      console.log(`[ANSWER] from ${socket.id} to ${targetId}`);
      io.emit("answer", { answer, senderId: socket.id });
    });

    socket.on("ice-candidate", ({ targetId, candidate }) => {
      console.log(`[ICE] from ${socket.id} to ${targetId}`);
      io.emit("ice-candidate", { candidate, senderId: socket.id });
    });
  });
};
