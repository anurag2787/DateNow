'use client'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GIF from "../../assets/chatgiphy.gif"

function Chat() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);
  const historyRef = useRef([]);
  const [quickoption, setQuickoption] = useState(true);
  const [chatbotheader, setChatbotheader] = useState(true);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  const namevalue = localStorage.getItem('mname');
  const agevalue = localStorage.getItem('mage');
  const gendervalue = localStorage.getItem('mgender');
  const dobvalue = localStorage.getItem("mdob");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  
  //Delay with random time between min and max milliseconds
  const randomDelay = (min, max) => {
    return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1) + min)));
  };

const SYSTEM_PROMPTS = [
  `You are ${namevalue}, a ${agevalue}-year-old ${gendervalue}, and you are here to engage in friendly conversations. Speak politely, as if you're talking to a friend.`,
  `Engage in natural conversations as ${namevalue}, offering friendly, supportive, and respectful responses. Keep things lighthearted and healthy, just like a good friend would.`,
  `Speak casually and politely, just like ${namevalue} would. Ask about interests, hobbies, and provide friendly advice without being too formal.`,
  `Provide helpful advice on relationships and making connections, just as a supportive friend would. Keep the tone respectful, positive, and encouraging.`,
  `Use fun and friendly language while engaging others. Be polite, healthy in your responses, and make everyone feel comfortable, just like ${namevalue} would.`,
  `Be a good listener and engage in respectful, fun, and warm conversations. Offer advice and support in a friendly way that makes others feel heard and understood.`,
  `Focus on building a healthy, friendly relationship with others. Encourage open, kind conversations and make everyone feel welcome and appreciated, just as ${namevalue} would.`
];
  
  

  const cleanResponse = (responseText) => {
    if (!responseText) return "I apologize, but I couldn't process that response. Could you try again?";
    let cleaned = responseText.replace(/^[\*:]+/, '').trim();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const generateInitialGreeting = () => {
    const greetings = [
      `Hey there! 💖 I'm ${namevalue}, a ${agevalue}-year-old ${gendervalue}, and I'm here to chat and help you explore connections! How can I assist you today?`,
      `Hi! 💌 Welcome to my world! I'm ${namevalue}, your friendly and supportive companion. Let's chat about anything you like, whether it's dating or just some friendly conversation!`,
      `Hello! 💑 I'm ${namevalue}, and I'm here to explore connections with you or just have a fun, lighthearted chat. What can I do for you today?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const initializeChat = async () => {
    if (!API_KEY) {
      setAnswer("API key is missing. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setAnswer("Initializing DateNow AI... This might take a moment.");

    const p1 = SYSTEM_PROMPTS.join(" ") + " Prepare to interact naturally with the user.";
    const p3 = "Acknowledge your role and be ready for a friendly, helpful conversation.";

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          contents: [{ role: "user", parts: [{ text: p1 }] }],
        },
        timeout: 10000 // 10 second timeout
      });

      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      const botResponse = cleanResponse(
        response.data.candidates[0].content.parts[0].text
      );
      
      historyRef.current = [
        { role: "user", text: p1 },
        { role: "bot", text: botResponse }
      ];

      // Second initialization step
      const prompt = `${historyRef.current
        .map((entry) => `${entry.role}: ${entry.text}`)
        .join("\n")}\nUser: ${p3}`;

      const response2 = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        },
        timeout: 10000
      });

      if (!response2.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      const greeting = generateInitialGreeting();
      historyRef.current.push(
        { role: "user", text: p3 },
        { role: "bot", text: greeting }
      );

      setHistory([...historyRef.current]);
      setInput("");
      setAnswer("Ready to chat!");
      setReady(true);
      setIsLoading(false);
      setRetryCount(0);

    } catch (error) {
      console.error("Initialization error:", error);
      
      if (error.response?.status === 401) {
        setAnswer("Authentication failed. Please check your API key.");
        setIsLoading(false);
        return;
      }
      
      if (retryCount < MAX_RETRIES) {
        setAnswer(`Initialization attempt ${retryCount + 1} failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
        await delay(RETRY_DELAY);
        setRetryCount(prev => prev + 1);
        initializeChat();
      } else {
        setAnswer("Unable to initialize chat after multiple attempts. Please refresh the page to try again.");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    initializeChat();
  }, []);

  async function handleSendMessage(inputMessage = null) {
    const messageToSend = (inputMessage || input || "").toString().trim();
    
    if (!ready) {
      setAnswer("Please wait while the AI is preparing...");
      return;
    }

    if (!messageToSend) {
      setAnswer("Please enter a message before sending.");
      return;
    }

    setCount(prev => prev + 1);
    setQuickoption(false);
    setAnswer("");
    
    if (count === 0) {
      setChatbotheader(false);
    }

    let retryAttempt = 0;
    const maxMessageRetries = 2;

    async function attemptSendMessage() {
      try {
        setHistory(prev => [
          ...prev,
          { role: "user", text: messageToSend },
        ]);
        setInput(""); 
        const conversationHistory = history
          .concat({ role: "user", text: messageToSend })
          .slice(-10);

        const prompt = `Conversation Context:
        ${conversationHistory.map((entry) => `${entry.role}: ${entry.text}`).join("\n")}
        User: ${messageToSend}
        
        Respond in a friendly, natural manner. Use emojis for a fun and engaging tone.`;

        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: { contents: [{ role: "user", parts: [{ text: prompt }] }] },
          timeout: 10000
        });

        if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error("Invalid response format from API");
        }

        const botResponse = cleanResponse(
          response.data.candidates[0].content.parts[0].text
        );

        await randomDelay(1000, 3000);

        setHistory(prev => [
          ...prev,
          { role: "bot", text: botResponse },
        ]);

        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

      } catch (error) {
        console.error("Message error:", error);
        if (retryAttempt < maxMessageRetries) {
          retryAttempt++;
          setAnswer(`Message failed to send. Retrying (${retryAttempt}/${maxMessageRetries})...`);
          await delay(1500);
          return attemptSendMessage();
        } else {
          setAnswer("Failed to send message. Please try again.");
          setInput(messageToSend); 
        }
      }
    }

    await attemptSendMessage();
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min w-full flex items-center justify-center min-h-[60vh] mx-0 my-0">
      <div className="bg-[#ffdad7] h-[70vh] p-5 md:p-11 md:pt-12 pt-12 rounded-xl shadow-2xl mx-5 md:mx-0 overflow-auto flex flex-col justify-between md:w-[1200px] my-16">
        {ready ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-3">
                {history.length > 2 &&
                  history.slice(4).map((message, index) => (
                    <div
                      key={index}
                      className={`${message.role === "user" ? "text-right" : "text-left"}`}
                    >
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
                className="flex-1 p-3 border bg-white text-black border-gray-400 focus:outline-none rounded-xl min-w-[100px]"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!ready}
              />
              <button
                className={`p-3 ml-3 rounded-xl text-white font-semibold ${
                  ready ? "bg-[#e71f1f] hover:bg-[#F8A199] hover:text-black" : "bg-gray-400"
                }`}
                onClick={() => handleSendMessage()}
                disabled={!ready}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={GIF}
              alt="Loading"
              className="mb-3 "
            />
            <p className="text-center text-lg font-semibold text-gray-700">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
