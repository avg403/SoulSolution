import React, { useState, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Login.css";
import logo from "../../Image/logo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResendSuccess(null);
    setUnverifiedEmail(false);
    setShowErrorPopup(false);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        // Set unverified email state to true to show the verification message
        setUnverifiedEmail(true);
        // Sign out the user since they're not verified
        await auth.signOut();
        return;
      }

      // Email is verified, continue with the login flow
      // Fetch user document from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update emailVerified flag in Firestore if needed
        if (userData.emailVerified === false) {
          await updateDoc(doc(db, "users", user.uid), {
            emailVerified: true,
          });
        }

        // Check if it's the user's first login
        if (userData?.firstLogin) {
          navigate("/assessment"); // Redirect to assessment page on first login
        } else {
          const lastMoodCheckin = userData?.lastMoodCheckin;
          const today = new Date().toISOString().split("T")[0]; // Today's date in "YYYY-MM-DD" format

          if (lastMoodCheckin && lastMoodCheckin.startsWith(today)) {
            navigate("/chatinterface"); // Navigate to chat interface if mood is already checked in
          } else {
            navigate("/dailymood"); // Navigate to daily mood check-in
          }
        }
      } else {
        showPopupError("User data not found. Please check your account.");
      }
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        showPopupError("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        showPopupError("No user found with this email.");
      } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        showPopupError("Invalid email or password. Please check your credentials.");
      } else {
        showPopupError("An error occurred during login. Please try again.");
        console.error("Login error:", err);
      }
    }
  };

  const showPopupError = (message: string) => {
    setErrorMessage(message);
    setShowErrorPopup(true);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleResendVerification = async () => {
    try {
      // Sign in the user temporarily to get the user object
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Sign out since we don't want unverified users to be logged in
      await auth.signOut();

      setResendSuccess(
        "Verification email has been resent. Please check your inbox."
      );
    } catch (err: any) {
      showPopupError("Failed to resend verification email: " + err.message);
    }
  };

  // If the user has entered correct credentials but email is not verified
  if (unverifiedEmail) {
    return (
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-center mt-4 name">SoulSolution</div>
        <div className="p-3 mt-3 text-center">
          <div className="alert alert-warning">
            <h4>Email Not Verified</h4>
            <p>
              Your email address has not been verified yet. Please check your
              inbox for a verification link.
            </p>
            <p>
              If you can't find the email, you can request a new verification
              link below.
            </p>
          </div>

          {resendSuccess && (
            <div className="alert alert-success">{resendSuccess}</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn mt-3" onClick={handleResendVerification}>
            Resend Link
          </button>

          <div className="mt-3">
            <Link to="/signup" className="btn btn-outline-secondary">
              Return to Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-center mt-4 name">SoulSolution</div>
      <form className="p-3 mt-3" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
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
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn mt-3" type="submit">
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        <Link to="/forgotpassword">Forget password?</Link> or{" "}
        <Link to="/signup">Sign up</Link>
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h4>Error</h4>
              <button className="close-btn" onClick={closeErrorPopup}>×</button>
            </div>
            <div className="popup-body">
              <p>{errorMessage}</p>
            </div>
            <div className="popup-footer">
              <button className="btn" onClick={closeErrorPopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;