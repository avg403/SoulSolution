import React from "react";
import "./Home.css";
import logoround from "../../Image/logoround.png";

const Home: React.FC = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            SoulSolution
          </a>
          <ul className="navbar-menu">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Personal Counselling Companion</h1>
          <p>
            Empowering you to find clarity and peace through AI-driven
            counselling.
          </p>
          <a href="#get-started" className="cta-button">
            Get Started
          </a>
        </div>
        <div className="hero-image">
          <img src={logoround} alt="SoulSolution" className="app-logo" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose SoulSolution?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>24/7 Availability</h3>
            <p>Access counselling support anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <h3>AI-Powered Insights</h3>
            <p>Get personalized advice based on your unique needs.</p>
          </div>
          <div className="feature-card">
            <h3>Confidential & Secure</h3>
            <p>Your privacy is our top priority.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About SoulSolution</h2>
        <p>
          SoulSolution is a counselling chatbot designed to help you navigate
          life's challenges. Whether you're dealing with stress, anxiety, or
          just need someone to talk to, SoulSolution is here for you.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} SoulSolution. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
