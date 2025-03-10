import React, { useState, FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import logo from "../../Image/logo.png";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // First, check if the email exists in your Firestore database
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      // If no documents match, the email doesn't exist
      if (querySnapshot.empty) {
        setError("You don't have an account with this email. Please sign up first.");
        setIsLoading(false);
        
        // Redirect to signup page after 2 seconds
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
        
        return;
      }

      // Email exists, proceed with password reset
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent successfully! Check your inbox.");
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Password reset error:", err);
      if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
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
        <button className="btn mt-3" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Send Reset Link"}
        </button>
      </form>
      <div className="text-center fs-6">
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;