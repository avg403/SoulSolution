import React, { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Login.css";
import logo from "../../Image/logo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user document from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

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
        setError("User data not found. Please check your account.");
      }
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
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
    </div>
  );
};

export default Login;
