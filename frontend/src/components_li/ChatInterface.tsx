import React, { useState, useEffect, useRef } from "react";
import {
  FaRegSmile,
  FaChartBar,
  FaPaperPlane,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import "./ChatInterface.css";
import logoround from "../../Image/logoround.png";

interface Message {
  content: string;
  isUser: boolean;
  emotions?: Array<{ label: string; score: number }>;
  timestamp: number;
}

const MESSAGES_TO_RETAIN = 10; // Number of recent messages to load when returning to chat

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!auth.currentUser) return;
      
      try {
        const userId = auth.currentUser.uid;
        
        // Check if user has a chat history
        const chatHistoryRef = doc(db, "chatHistory", userId);
        const chatHistoryDoc = await getDoc(chatHistoryRef);
        
        if (chatHistoryDoc.exists()) {
          // Get the recent messages
          const messagesRef = collection(db, "chatHistory", userId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"), limit(MESSAGES_TO_RETAIN));
          const querySnapshot = await getDocs(q);
          
          const loadedMessages: Message[] = [];
          querySnapshot.forEach((doc) => {
            loadedMessages.push(doc.data() as Message);
          });
          
          // Reverse to get chronological order
          setMessages(loadedMessages.reverse());
        } else {
          // Initialize with welcome message if no history exists
          const welcomeMessage: Message = {
            content: "Hello! I'm here to listen and help. How are you feeling today?",
            isUser: false,
            timestamp: Date.now()
          };
          setMessages([welcomeMessage]);
          
          // Create the chat history document
          await setDoc(chatHistoryRef, { 
            created: Date.now(),
            lastActive: Date.now()
          });
          
          // Save the welcome message
          await setDoc(
            doc(db, "chatHistory", userId, "messages", Date.now().toString()),
            welcomeMessage
          );
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading chat history:", error);
        // Fallback to welcome message if there's an error
        setMessages([{
          content: "Hello! I'm here to listen and help. How are you feeling today?",
          isUser: false,
          timestamp: Date.now()
        }]);
        setIsInitialized(true);
      }
    };
    
    loadChatHistory();
  }, []);

  // Save messages to Firestore when they change
  useEffect(() => {
    const saveChatHistory = async () => {
      if (!auth.currentUser || !isInitialized || messages.length === 0) return;
      
      try {
        const userId = auth.currentUser.uid;
        
        // Update last active timestamp
        await setDoc(doc(db, "chatHistory", userId), { 
          lastActive: Date.now() 
        }, { merge: true });
        
        // Save only the most recent message (optimization)
        const latestMessage = messages[messages.length - 1];
        await setDoc(
          doc(db, "chatHistory", userId, "messages", latestMessage.timestamp.toString()),
          latestMessage
        );
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    };
    
    saveChatHistory();
  }, [messages, isInitialized]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input;
      setInput("");
      
      // Add user message to chat with timestamp
      const userMessageObj: Message = {
        content: userMessage,
        isUser: true,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, userMessageObj]);
      
      // Set loading state
      setIsLoading(true);
      
      try {
        console.log("Sending request to:", "http://localhost:8000/emotion-chat/");
        
        // Get the last few messages to provide context
        const recentMessages = messages.slice(-3)
          .map(msg => msg.content)
          .join("\n\n");
        
        // Include previous messages context in the request
        const requestBody = {
          text: userMessage,
          context: recentMessages
        };
        
        // Make API call to backend
        const response = await fetch("http://localhost:8000/emotion-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", response.status, errorText);
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Response data:", data);
        
        // Add bot response to chat with timestamp
        const botMessageObj: Message = {
          content: data.bot_response,
          isUser: false,
          emotions: data.emotions,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, botMessageObj]);
      } catch (error) {
        console.error("Detailed error:", error);
        // Add error message
        const errorMessageObj: Message = {
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, errorMessageObj]);
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
            <Message key={`${index}-${message.timestamp}`} message={message} />
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