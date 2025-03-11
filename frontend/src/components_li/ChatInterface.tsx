import React, { useState, useEffect, useRef } from "react";
import {
  FaRegSmile,
  FaChartBar,
  FaPaperPlane,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import "./ChatInterface.css";
import logoround from "../../Image/logoround.png";
import botAvatar from "../../Image/logoround.png";

interface Message {
  content: string;
  isUser: boolean;
  emotions?: Array<{ label: string; score: number }>;
  timestamp: number;
  source?: string; // Added to track source of response (rasa/fallback)
}

const MESSAGES_TO_RETAIN = 20; // Increased to provide better context

const Navbar = ({ onClearChat }: { onClearChat: () => void }) => {
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
        <button className="nav-button" onClick={onClearChat}>
          <FaTrash />
          <span>Clear Chat</span>
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
        onKeyPress={(e) =>
          e.key === "Enter" && !isLoading && handleSendMessage()
        }
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
      {message.content.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < message.content.split("\n").length - 1 && <br />}
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

        {message.source === "rasa" && <div className="source-tag rasa">🏠</div>}
        {message.source === "fallback" && (
          <div className="source-tag fallback">🤖</div>
        )}
        {message.source === "system" && (
          <div className="source-tag system">👻</div>
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
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [clearTimestamp, setClearTimestamp] = useState<number | null>(null);
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
          const chatData = chatHistoryDoc.data();

          // Get the clearTimestamp (when chat was last cleared)
          const storedClearTimestamp = chatData.clearTimestamp || null;
          setClearTimestamp(storedClearTimestamp);

          // Get session ID
          let currentSessionId = chatData.sessionId;
          if (!currentSessionId) {
            // Create a new session ID if none exists
            currentSessionId = crypto.randomUUID();
            // Save the session ID to Firestore
            await setDoc(
              chatHistoryRef,
              {
                sessionId: currentSessionId,
                lastActive: Date.now(),
              },
              { merge: true }
            );
          }
          setSessionId(currentSessionId);

          // Get all messages
          const messagesRef = collection(db, "chatHistory", userId, "messages");
          const q = query(
            messagesRef,
            orderBy("timestamp", "desc"),
            limit(MESSAGES_TO_RETAIN)
          );
          const querySnapshot = await getDocs(q);

          const loadedMessages: Message[] = [];
          querySnapshot.forEach((doc) => {
            loadedMessages.push(doc.data() as Message);
          });

          // Sort messages chronologically
          const sortedMessages = loadedMessages.reverse();

          // Store all messages for context
          setMessages(sortedMessages);

          // For display, only show messages after the last clear timestamp
          if (storedClearTimestamp) {
            const filteredMessages = sortedMessages.filter(
              (msg) => msg.timestamp > storedClearTimestamp
            );

            if (filteredMessages.length === 0) {
              // If no messages after clearing, show welcome message
              const welcomeMessage: Message = {
                content: "Chat cleared. How can I help you today?",
                isUser: false,
                timestamp: Date.now(),
                source: "system",
              };
              setDisplayedMessages([welcomeMessage]);

              // Add welcome message to Firebase
              await setDoc(
                doc(
                  db,
                  "chatHistory",
                  userId,
                  "messages",
                  Date.now().toString()
                ),
                welcomeMessage
              );

              // Add to messages array too
              setMessages((prev) => [...prev, welcomeMessage]);
            } else {
              setDisplayedMessages(filteredMessages);
            }
          } else {
            // If no clear timestamp, show all messages
            setDisplayedMessages(sortedMessages);
          }
        } else {
          // Initialize with welcome message if no history exists
          const welcomeMessage: Message = {
            content:
              "Hello! I'm here to listen and help. How are you feeling today?",
            isUser: false,
            timestamp: Date.now(),
            source: "system",
          };
          setMessages([welcomeMessage]);
          setDisplayedMessages([welcomeMessage]);

          // Create a new session ID
          const newSessionId = crypto.randomUUID();
          setSessionId(newSessionId);

          // Create the chat history document
          await setDoc(chatHistoryRef, {
            created: Date.now(),
            lastActive: Date.now(),
            sessionId: newSessionId,
            clearTimestamp: null,
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
        const welcomeMessage = {
          content:
            "Hello! I'm here to listen and help. How are you feeling today?💞",
          isUser: false,
          timestamp: Date.now(),
          source: "system",
        };
        setMessages([welcomeMessage]);
        setDisplayedMessages([welcomeMessage]);

        // Create a new session ID without saving to Firebase
        setSessionId(crypto.randomUUID());
        setIsInitialized(true);
      }
    };

    loadChatHistory();
  }, []);

  // Handle clearing the chat
  const handleClearChat = async () => {
    if (!auth.currentUser) return;

    try {
      const now = Date.now();
      setClearTimestamp(now);

      // Generate and display welcome message
      const welcomeMessage: Message = {
        content:
          "Hello! I'm here to listen and help. How are you feeling today?🫂",
        isUser: false,
        timestamp: now + 1, // Add 1ms to ensure it's after the clear timestamp
        source: "system",
      };

      // Set displayed messages to only show the welcome message
      setDisplayedMessages([welcomeMessage]);

      // Keep full message history but add welcome message
      setMessages((prev) => [...prev, welcomeMessage]);

      // Update clearTimestamp in Firebase
      const userId = auth.currentUser.uid;
      await setDoc(
        doc(db, "chatHistory", userId),
        {
          lastActive: now,
          clearTimestamp: now,
        },
        { merge: true }
      );

      // Save welcome message to Firebase
      await setDoc(
        doc(
          db,
          "chatHistory",
          userId,
          "messages",
          welcomeMessage.timestamp.toString()
        ),
        welcomeMessage
      );
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  // Save messages to Firestore when they change
  useEffect(() => {
    const saveChatHistory = async () => {
      if (!auth.currentUser || !isInitialized || messages.length === 0) return;

      try {
        const userId = auth.currentUser.uid;

        // Update last active timestamp
        await setDoc(
          doc(db, "chatHistory", userId),
          {
            lastActive: Date.now(),
            sessionId: sessionId,
            clearTimestamp: clearTimestamp,
          },
          { merge: true }
        );

        // Save only the most recent message (optimization)
        const latestMessage = messages[messages.length - 1];
        await setDoc(
          doc(
            db,
            "chatHistory",
            userId,
            "messages",
            latestMessage.timestamp.toString()
          ),
          latestMessage
        );
      } catch (error) {
        console.error("Error saving chat history:", error);
      }
    };

    saveChatHistory();
  }, [messages, isInitialized, sessionId, clearTimestamp]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input;
      setInput("");

      // Add user message to chat with timestamp
      const now = Date.now();
      const userMessageObj: Message = {
        content: userMessage,
        isUser: true,
        timestamp: now,
        source: "user",
      };

      // Update both the full message history
      setMessages((prev) => [...prev, userMessageObj]);

      // Add to displayed messages
      setDisplayedMessages((prev) => [...prev, userMessageObj]);

      // Set loading state
      setIsLoading(true);

      try {
        // Include session ID in the request
        const requestBody = {
          text: userMessage,
          session_id: sessionId,
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
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();

        // Update session ID if returned from backend
        if (data.session_id && data.session_id !== sessionId) {
          setSessionId(data.session_id);

          // Update session ID in Firebase
          if (auth.currentUser) {
            await setDoc(
              doc(db, "chatHistory", auth.currentUser.uid),
              {
                sessionId: data.session_id,
                lastActive: Date.now(),
              },
              { merge: true }
            );
          }
        }

        // Add bot response to chat with timestamp and source
        const botMessageObj: Message = {
          content: data.bot_response,
          isUser: false,
          emotions: data.emotions,
          timestamp: Date.now(),
          source: data.response_source || "unknown",
        };

        // Update both the full message history and displayed messages
        setMessages((prev) => [...prev, botMessageObj]);
        setDisplayedMessages((prev) => [...prev, botMessageObj]);
      } catch (error) {
        console.error("Detailed error:", error);
        // Add error message
        const errorMessageObj: Message = {
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: Date.now(),
          source: "error",
        };

        // Update both the full message history and displayed messages
        setMessages((prev) => [...prev, errorMessageObj]);
        setDisplayedMessages((prev) => [...prev, errorMessageObj]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-interface">
      <Navbar onClearChat={handleClearChat} />
      <div className="chat-area">
        <div className="messages-container">
          {displayedMessages.map((message, index) => (
            <Message key={`${index}-${message.timestamp}`} message={message} />
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="avatar">
                <img src={botAvatar} alt="Bot Avatar" />
              </div>
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
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
