import React, { useState } from "react";
import {
  FaRegSmile,
  FaChartBar,
  FaPaperPlane,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./ChatInterface.css";
import logoround from "../../Image/logoround.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out the user from Firebase
      await signOut(auth);

      // Redirect to the login page after logging out
      navigate("/login");
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <div className="sidebar">
      <img src={logoround} alt="SoulSolution Logo" className="app-logo" />
      <div className="nav-buttons">
        <button
          className="nav-button"
          onClick={() => navigate("/mood-checkin")}
        >
          <FaRegSmile />
          <span>Mood Check-in</span>
        </button>
        <button
          className="nav-button"
          onClick={() => navigate("/data-visualization")}
        >
          <FaChartBar />
          <span>Analytics</span>
        </button>
        <button className="nav-button">
          <span>🎥</span>
          <span>Watch Video</span>
        </button>
        <button className="nav-button logout-button" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

const MessageInput = ({
  input,
  setInput,
  handleSendMessage,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}) => (
  <div className="input-container">
    <div className="input-wrapper">
      <input
        type="text"
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message SoulSolution..."
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FaPaperPlane size={20} />
      </button>
    </div>
  </div>
);

const Message = ({ content, isUser }: { content: string; isUser: boolean }) => (
  <div className={`message ${isUser ? "user" : "assistant"}`}>
    <div className="avatar" />
    <div className="message-content">{content}</div>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="chat-interface">
      <Navbar />
      <div className="chat-area">
        <div className="messages-container">
          <div className="welcome-message">
            Hello! I'm here to listen and help. How are you feeling today?
          </div>
          {messages.map((message, index) => (
            <Message key={index} content={message} isUser={true} />
          ))}
        </div>
        <MessageInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
