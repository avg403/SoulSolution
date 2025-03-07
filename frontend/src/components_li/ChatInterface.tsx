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
import botAvatar from '../../Image/logoround.png';


interface Message {
  content: string;
  isUser: boolean;
  emotions?: Array<{ label: string; score: number }>;
  timestamp: number;
  source?: string; // Added to track source of response (rasa/fallback)
}

const MESSAGES_TO_RETAIN = 20; // Increased to provide better context

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
    <div className="avatar">
      {/* Add image for assistant messages */}
      {!message.isUser && <img src={botAvatar} alt="Bot Avatar" />}
    </div>
    <div className="message-content">
      {message.content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < message.content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
    
    {(message.emotions || message.source) && (
      <div className="message-info">
        {message.emotions && message.emotions.length > 0 && (
          <div className="emotion-tags">
            {message.emotions.slice(0, 2).map((emotion, idx) => (
              <span key={idx} className="emotion-tag">
                {emotion.label}: {(emotion.score * 100).toFixed(0)}%
              </span>
            ))}
          </div>
        )}
        
        {message.source === "rasa" && (
          <div className="source-tag rasa">🏠</div>
        )}
        {message.source === "fallback" && (
          <div className="source-tag fallback">🤖</div>
        )}
        {message.source === "system" && (
          <div className="source-tag system">⚙️</div>
        )}
        {message.source === "error" && (
          <div className="source-tag error">⚠️</div>
        )}
        {message.source === "unknown" && (
          <div className="source-tag unknown">❓</div>
        )}
      </div>
    )}
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
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
          // Get the recent messages - increased limit for better context
          const messagesRef = collection(db, "chatHistory", userId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"), limit(MESSAGES_TO_RETAIN));
          const querySnapshot = await getDocs(q);
          
          const loadedMessages: Message[] = [];
          querySnapshot.forEach((doc) => {
            loadedMessages.push(doc.data() as Message);
          });
          
          // Reverse to get chronological order
          setMessages(loadedMessages.reverse());
          
          // Get or create a session ID
          const sessionData = chatHistoryDoc.data();
          if (sessionData && sessionData.sessionId) {
            setSessionId(sessionData.sessionId);
          } else {
            // Create a new session ID
            const newSessionId = crypto.randomUUID();
            setSessionId(newSessionId);
            // Save the session ID to Firestore
            await setDoc(chatHistoryRef, { 
              sessionId: newSessionId,
              lastActive: Date.now()
            }, { merge: true });
          }
        } else {
          // Initialize with welcome message if no history exists
          const welcomeMessage: Message = {
            content: "Hello! I'm here to listen and help. How are you feeling today?",
            isUser: false,
            timestamp: Date.now(),
            source: "system"
          };
          setMessages([welcomeMessage]);
          
          // Create a new session ID
          const newSessionId = crypto.randomUUID();
          setSessionId(newSessionId);
          
          // Create the chat history document
          await setDoc(chatHistoryRef, { 
            created: Date.now(),
            lastActive: Date.now(),
            sessionId: newSessionId
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
          timestamp: Date.now(),
          source: "system"
        }]);
        
        // Create a new session ID without saving to Firebase
        setSessionId(crypto.randomUUID());
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
          lastActive: Date.now(),
          sessionId: sessionId
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
  }, [messages, isInitialized, sessionId]);

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
        timestamp: Date.now(),
        source: "user"
      };
      
      setMessages(prev => [...prev, userMessageObj]);
      
      // Set loading state
      setIsLoading(true);
      
      try {
        // We don't need to create a full context string, the backend will handle it
        // We'll just pass the session ID which will be used to retrieve conversation context
        
        // Include session ID in the request
        const requestBody = {
          text: userMessage,
          session_id: sessionId
        };
        
        // Make API call to backend
        const response = await fetch("http://localhost:8000/emotion-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", response.status, errorText);
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        
        // Update session ID if returned from backend
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id);
          
          // Update session ID in Firebase
          if (auth.currentUser) {
            await setDoc(doc(db, "chatHistory", auth.currentUser.uid), {
              sessionId: data.session_id,
              lastActive: Date.now()
            }, { merge: true });
          }
        }
        
        // Add bot response to chat with timestamp and source
        const botMessageObj: Message = {
          content: data.bot_response,
          isUser: false,
          emotions: data.emotions,
          timestamp: Date.now(),
          source: data.response_source || "unknown"
        };
        
        setMessages(prev => [...prev, botMessageObj]);
      } catch (error) {
        console.error("Detailed error:", error);
        // Add error message
        const errorMessageObj: Message = {
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: Date.now(),
          source: "error"
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