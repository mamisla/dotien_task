import React, { useState, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      user: "bot",
      text: "Hello, I am your personal assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState("openai");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { user: "me", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/chat/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "bot", text: data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "bot", text: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">ChatBot</h2>
        <div className="mb-4">
          <label className="mr-2">Choose Endpoint:</label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="openai">OpenAI</option>
            <option value="huggingface">Hugging Face</option>
          </select>
        </div>
        <div className="mb-6 h-96 overflow-y-auto flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.user === "me"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
              style={{ maxWidth: "75%" }}
            >
              {message.text}
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-lg bg-gray-300 text-black text-center self-start">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse delay-75">.</span>
              <span className="animate-pulse delay-150">.</span>
            </div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-600 focus:outline-none"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
