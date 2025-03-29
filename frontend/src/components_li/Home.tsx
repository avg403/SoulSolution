import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import "./home.css";
import panda from "../../Image/panda.gif";
import logoround from "../../Image/logoround.png";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // State to handle form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_obrqao9", //  EmailJS Service ID
        "template_5qwvyah", //  EmailJS Template ID
        emailParams,
        "ORqtslVz27DUKVXab" // EmailJS Public Key
      )
      .then(() => {
        setModalMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Failed to send message", error);
        setModalMessage("❌ Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
        setIsModalVisible(true); // Show the modal
      });
  };

  // Close Modal
  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage(null);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img
              src={logoround}
              alt="SoulSolution Logo"
              className="logo-image"
            />
            SoulSolution
          </div>

          <nav className="main-nav">
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
          <button className="cta-button" onClick={() => navigate("/login")}>
            Try it for free!
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>AI-Powered Mental Health Support Available 24/7</h1>
            <p>
              Talk to SoulSolution anytime you need emotional support or
              guidance.
            </p>
            <button className="cta-button" onClick={() => navigate("/login")}>
              Chat with SoulSolution
            </button>
          </div>
          <div className="hero-image">
            <img src={panda} alt="SoulSolution" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="about">
        <div className="container">
          <h2>How SoulSolution Helps You</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Emotional Support</h3>
              <p>
                Get support when you're feeling anxious, stressed, or
                overwhelmed.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💭</div>
              <h3>Guided Reflection</h3>
              <p>
                Process your thoughts and feelings with guided conversations.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛌</div>
              <h3>Sleep & Relaxation</h3>
              <p>
                Learn techniques to improve sleep quality and reduce stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Reach out to us anytime.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="cta-button" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              zIndex: 1001,
              color: "black",
              display: "block",
            }}
          >
            <p style={{ fontSize: "16px", margin: "10px 0" }}>{modalMessage}</p>
            <button
              onClick={closeModal}
              className="modal-close-btn"
              style={{ display: "inline-block" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
