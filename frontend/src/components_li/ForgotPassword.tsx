import React, { useState, FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Import the CSS for styling
import logo from "../../Image/logo.png";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Password reset email sent successfully! Check your inbox."
      );
      setEmail(""); // Clear the email input
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful password reset request
      }, 3000);
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-center mt-4 name">SoulSolution</div>
      <div className="text-center fs-6 mt-3">Forgot Password?</div>
      <form className="p-3 mt-3" onSubmit={handlePasswordReset}>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="userName"
            id="userName"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn mt-3" type="submit">
          Send Reset Link
        </button>
      </form>
      <div className="text-center fs-6">
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
