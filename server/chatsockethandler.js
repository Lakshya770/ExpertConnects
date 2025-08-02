import Message from "./models/messages.model.js";

const chatSocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinroom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("sendMessage", async (data) => {
      const {
        roomId,
        senderId,
        senderType,
        receiverId,
        receiverType,
        message,
      } = data;
      const msg = new Message({
        roomId,
        senderId,
        senderType,
        receiverId,
        receiverType,
        message,
      });

      try {
        await msg.save();
        io.to(roomId).emit("receiveMessage", msg);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default chatSocketHandler;
