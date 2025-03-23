import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"], 
});

function Talk() {
  const [ready, setReady] = useState(true);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
  useEffect(() => {
    socket.on("m", (msg) => {
      setMessages((messages) => [...messages, { role: "Server", text: msg }]);
    });

    return () => {
      socket.off("m");
    };
  }, []);
  const sendMessage = async () => {
    setMessages((messages) => [...messages, { role: "user", text: message }]);
    if (message.trim() !== "") {
      socket.emit("user-message", message);

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/talkmsg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "user", text: message }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to save message");
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setMessage("");
    }
    else{
      alert("Enter message before sending");
    }
  };

  // const messages = [
  //   { role: "user", text: "Hey there! How's it going?" },
  //   { role: "Server", text: "Hello! I'm here to chat. How can I help?" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "Server", text: "Tell me something interesting!" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "Server", text: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!" },
  //   { role: "Server", text: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!" },
  //   { role: "user", text: "Hey there! How's it going?" },
  //   { role: "Server", text: "Hello! I'm here to chat. How can I help?" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "Server", text: "Tell me something interesting!" },
  //   { role: "user", text: "Tell me something interesting!" },
  //   { role: "Server", text: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!" },
  //   { role: "Server", text: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!" },
  // ];

  return (
    <div className=" w-full flex items-center justify-center mx-0 my-0">
      <div className="bg-[#ffdad7] h-[75vh] p-5 md:p-11 md:pt-12 my-10 pt-12 rounded-xl shadow-2xl mx-5 md:mx-0 overflow-auto flex flex-col justify-between md:w-[1200px]">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`${message.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 mr-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-[#F8A199] text-black font-semibold"
                      : "bg-[#e71f1f] text-white font-semibold"
                  } break-words max-w-[80%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-400 focus:outline-none rounded-xl min-w-[100px]"
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
              ready ? "bg-[#e71f1f] hover:bg-[#F8A199] hover:text-black" : "bg-gray-400"
            }`}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Talk;
