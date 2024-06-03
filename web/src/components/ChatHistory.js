import React, { useEffect, useState } from "react";

const ChatHistory = ({ onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/chat/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Chat History</h2>
        <div className="h-96 overflow-y-auto">
          {history.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg my-2 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              style={{ maxWidth: "75%" }}
            >
              <strong>{message.role === "user" ? "You" : "Bot"}:</strong>{" "}
              {message.content}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
