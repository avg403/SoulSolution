import React from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";
import panda from "../../Image/panda.gif";
import logoround from "../../Image/logoround.png";

const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation function
  return (
    <div className="app">
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

      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Reach out to us anytime.</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="cta-button">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
