// import { useEffect } from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });
//     console.log(chat.data.messages);
//     const chatMessages = chat?.data?.messages.map((msg) => {
//       return {
//         firstName: msg?.senderId?.firstName,
//         lastName: msg?.senderId?.lastName,
//         text: msg?.text,
//       };
//     });
//     setMessages(chatMessages);
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("messageReceived", ({ firstName, lastName, text }) => {
//       console.log("Message received: ", firstName, text);
//       setMessages((messages) => [...messages, { firstName, lastName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user?.firstName,
//       lastName: user?.lastName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 m-auto border border-gray-600 rounded-lg mt-10 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " + (user.firstName === msg.firstName
//                   ? "chat-end"
//                   : "chat-start"
//                 )
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName}  ${msg.lastName}`}
//                 <time className="text-xs opacity-50">2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-primary">
//           {" "}
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      
      const chatMessages = chat?.data?.messages.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
        senderId: msg?.senderId?._id || msg?.senderId,
        timestamp: msg?.createdAt || new Date(),
      }));
      
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socket.on("userTyping", ({ userId: typingUserId }) => {
      if (typingUserId === targetUserId) {
        setIsTyping(true);
      }
    });

    socket.on("userStoppedTyping", ({ userId: typingUserId }) => {
      if (typingUserId === targetUserId) {
        setIsTyping(false);
      }
    });

    socket.on("userOnline", ({ userId: onlineUserId }) => {
      setOnlineUsers(prev => new Set(prev.add(onlineUserId)));
    });

    socket.on("messageError", (error) => {
      console.error("Message error:", error);
      // You can show a toast notification here
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit("typingStart", { userId, targetUserId });
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("typingStop", { userId, targetUserId });
      }, 1000);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    
    setNewMessage("");
    
    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("typingStop", { userId, targetUserId });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto h-[85vh] sm:h-[80vh] flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* Enhanced Chat Header */}
        <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Chat</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                onlineUsers.has(targetUserId) ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm text-gray-600">
                {onlineUsers.has(targetUserId) ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          {isTyping && (
            <div className="text-sm text-gray-500 italic">
              Typing...
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No messages yet. Start a conversation!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${userId === msg.senderId ? "justify-end" : "justify-start"} mb-3 sm:mb-4`}
              >
                <div className={`max-w-xs sm:max-w-md px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                  userId === msg.senderId 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}>
                  {userId !== msg.senderId && (
                    <div className="text-sm font-medium text-blue-600">
                      {/* {`${msg.firstName} ${msg.lastName}`} */}
                    </div>
                  )}
                  <div className="text-sm mt-1 break-words">{msg.text}</div>
                  <div className={`text-xs opacity-70 mt-1 ${
                    userId === msg.senderId ? 'text-blue-100' : 'text-gray-500'
                  } text-right`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Message Input */}
        <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
          <div className="flex items-center gap-2">
            <input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 text-white rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
            <button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 sm:py-2 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;