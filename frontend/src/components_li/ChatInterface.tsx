import React, { useState, useEffect, useRef } from "react";
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

interface Message {
  content: string;
  isUser: boolean;
  emotions?: Array<{ label: string; score: number }>;
}

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
  isLoading,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
}) => (
  <div className="input-container">
    <div className="input-wrapper">
      <input
        type="text"
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message SoulSolution..."
        onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
        disabled={isLoading}
      />
      <button 
        className="send-button" 
        onClick={handleSendMessage}
        disabled={isLoading}
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  </div>
);

const Message = ({ message }: { message: Message }) => (
  <div className={`message ${message.isUser ? "user" : "assistant"}`}>
    <div className="avatar" />
    <div className="message-content">
      {message.content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < message.content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
    {message.emotions && message.emotions.length > 0 && (
      <div className="emotion-tags">
        {message.emotions.slice(0, 3).map((emotion, idx) => (
          <span key={idx} className="emotion-tag">
            {emotion.label}: {(emotion.score * 100).toFixed(0)}%
          </span>
        ))}
      </div>
    )}
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! I'm here to listen and help. How are you feeling today?", isUser: false }
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input;
      setInput("");
      
      // Add user message to chat
      setMessages(prev => [...prev, { content: userMessage, isUser: true }]);
      
      // Set loading state
      setIsLoading(true);
      
      try {
        console.log("Sending request to:", "http://localhost:8000/emotion-chat/");
        // Make API call to backend
        const response = await fetch("http://localhost:8000/emotion-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: userMessage }),
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", response.status, errorText);
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Response data:", data);
        
        // Add bot response to chat
        setMessages(prev => [
          ...prev, 
          { 
            content: data.bot_response, 
            isUser: false,
            emotions: data.emotions
          }
        ]);
      } catch (error) {
        console.error("Detailed error:", error);
        // Add error message
        setMessages(prev => [
          ...prev, 
          { 
            content: "Sorry, I'm having trouble connecting right now. Please try again later.", 
            isUser: false 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-interface">
      <Navbar />
      <div className="chat-area">
        <div className="messages-container">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="avatar" />
              <div className="message-content typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;