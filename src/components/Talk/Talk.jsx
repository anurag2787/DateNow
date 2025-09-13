import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns'; // Optional: for relative time formatting
import sound from "../../assets/notification.mp3";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"],
  auth: {
    userid: null, // Will be set dynamically
    displayName: null // Will be set dynamically
  }
});

function Talk() {
  const [ready, setReady] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [islogin, setIslogin] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false); 

  const { user } = useAuth();

  // Update socket auth when user changes
  useEffect(() => {
    if (user) {
      socket.auth = {
        userid: user.uid,
        displayName: user.displayName || 'Anonymous'
      };
      socket.connect();
    }
  }, [user]);

  // Fetch previous messages when user logs in
  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (user) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/talkmsg`);
          if (!response.ok) {
            throw new Error('Failed to fetch previous messages');
          }
          const previousMessages = await response.json();
          setMessages(previousMessages);
        } catch (error) {
          console.error('Error fetching previous messages:', error);
        }
      }
    };

    fetchPreviousMessages();
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setIsLoaded(true);
      setIslogin(true);
      
      // Listen for messages from other users
      socket.on("m", (msg) => {
        // Check if the message is not from the current user
        if (msg.userid !== user.uid) {
          const notification = new Audio(sound);
          notification.play();    
          setMessages((prevMessages) => [...prevMessages, { 
            role: "Server", 
            text: msg.text, 
            userid: msg.userid,
            displayName: msg.displayName,
            createdAt: new Date()
          }]);
        }
      });

      return () => {
        socket.off("m");
      };
    }
    else{
      setIsLoaded(false);
      setIslogin(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = { 
        role: "user", 
        text: message, 
        userid: user.uid,
        displayName: user.displayName || 'Anonymous',
        createdAt: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket.emit("user-message", {
        ...newMessage,
        userid: user.uid
      });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/talkmsg`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save message");
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setMessage("");
    } else {
      alert("Enter message before sending");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#F8A199]">
        <div className="bg-[#ffdad7] h-[90vh] w-full max-w-[1200px] p-5 md:p-11 md:pt-12 pt-12 rounded-xl shadow-2xl overflow-auto flex flex-col justify-between">
        {isLoaded? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.userid === user.uid ? "text-right" : "text-left"
                    }`}
                  >
                    {message.userid === user.uid ? (
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="User avatar"
                              src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                          </div>
                        </div>
                        <div className="chat-header text-black c">
                          {message.displayName}
                          
                        </div>
                        <div className="chat-bubble bg-[#F8A199] text-black">{message.text}</div>
                        <div className="chat-footer text-black"><time className="text-xs opacity-50 text-black ml-2">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </time></div>
                      </div>
                    ) : (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Other user avatar"
                              src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                          </div>
                        </div>
                        <div className="chat-header text-black font-semibold">
                          {message.displayName}
                          
                        </div>
                        <div className="chat-bubble bg-[#e71f1f]">
                          {message.text}
                        </div>
                        <div className="chat-footer text-black"><time className="text-xs opacity-50 text-black ml-2">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </time></div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 p-3 border bg-white text-black border-gray-400 focus:outline-none rounded-xl min-w-[100px]"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                disabled={!ready}
              />
              <button
                className={`p-3 ml-3 rounded-xl text-white font-semibold ${
                  ready
                    ? "bg-[#e71f1f] hover:bg-[#F8A199] hover:text-black"
                    : "bg-gray-400"
                }`}
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#e71f1f] mb-3 md:text-4xl">
                Want to Join the Conversation?
              </h2>
              <p className="text-lg mb-6 max-w-md md:text-xl font-medium text-black">
                Ready to experience real-time chats and connect with others? To
                access this feature, please log in to your account first.
              </p>
              <button
                onClick={() => navigate("/login?redirect=/talk")}
                className="bg-[#e71f1f] hover:bg-[#F8A199] text-white hover:text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Go to Login Page
              </button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Talk;