import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store";
import axios from "axios";
import { io } from "socket.io-client";
import { Send } from "lucide-react";
import dotenv from "dotenv";

// dotenv.config();
const Chat = () => {
  const mineid = useParams().mineid;
  const sellerId = useParams().sellersid;
  const chattingto = useParams().boolean;
  const boolvalue = useStore((state) => state.boolval);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);
  const [label, setlabel] = useState({});

  const server_url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetch = async () => {
      const dt = await axios.get(
        `${server_url}api/messages/chatlabel/${sellerId}/${chattingto}`,
        { withCredentials: true }
      );
      console.log(dt.data.data);
      setlabel(dt.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${server_url}`, { transports: ["websocket"] });
    }

    const roomId = [mineid, sellerId].sort().join("-");
    socket.current.emit("joinroom", { roomId });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${server_url}api/messages/${roomId}`);
        setMessages(response?.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    socket.current.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.disconnect();
      socket.current = null;
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const roomId = [mineid, sellerId].sort().join("-");
      const senderType = boolvalue === 1 ? "User" : "ServiceProvider";
      const receiverType = senderType === "User" ? "ServiceProvider" : "User";

      const messageData = {
        roomId,
        senderId: mineid,
        senderType,
        receiverId: sellerId,
        receiverType,
        message: newMessage,
      };

      socket.current.emit("sendMessage", messageData);
      //   setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const container = messagesEndRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  //   useEffect()

  return (
    <div className="flex flex-col h-[550px] bg-gray-200 rounded-lg ">
      <div className="flex align-center items-center bg-slate-800 h-14">
        <img
          src={label.CoverPhotouser || label.Coverphoto}
          alt=""
          className="w-10 h-10 object-cover rounded-full ml-3 border-slate-300 border-2"
        />
        <h1 className="text-2xl font-bold ml-3  items-center text-white">
          {label.Name}
        </h1>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto min-h-[350px]"
        ref={messagesEndRef}
      >
        <div className="space-y-4">
          {messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.senderId === mineid ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.senderId === mineid
                    ? "bg-green-300 text-gray-800 rounded-br-none"
                    : "bg-purple-300 text-gray-800 rounded-bl-none"
                } shadow`}
              >
                <p className="break-words">{msg.message}</p>
              </div>
            </div>
          ))}
          {/* Invisible div for scrolling reference */}
          <div />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-slate-800 shadow-slate-400 shadow-md rounded-b-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 border-2 border-red-700 focus:outline focus:border-green-500 focus:border-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="rounded-full p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
