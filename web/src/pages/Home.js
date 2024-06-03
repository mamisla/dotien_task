import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const navigateToChat = () => {
    navigate("/chat");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Hello to Chat Bot</h1>
      {token && username ? (
        <>
          <p className="text-lg mb-2">Welcome, {username}!</p>
          <p className="text-lg mb-6">
            If you want to chat, press the button below.
          </p>
          <button
            onClick={navigateToChat}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Go to Chat Bot
          </button>
        </>
      ) : (
        <>
          <p className="text-lg mb-6">
            Please register or log in to use the chat bot.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={navigateToLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Log In
            </button>
            <button
              onClick={navigateToRegister}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
