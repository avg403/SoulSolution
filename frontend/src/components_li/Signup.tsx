import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth"; // Import this for email check
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Firebase imports
import logo from "../../Image/logo.png";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0); // Strength from 0 to 100
  const [strengthMessage, setStrengthMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>(""); // Email error state
  const navigate = useNavigate();

  const checkPasswordStrength = (password: string) => {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (length >= 8) strength += 20; // Length requirement
    if (hasUpperCase) strength += 20; // Uppercase check
    if (hasLowerCase) strength += 20; // Lowercase check
    if (hasNumbers) strength += 20; // Numbers check
    if (hasSpecialChars) strength += 20; // Special characters check

    setPasswordStrength(strength);

    if (strength <= 40) {
      setStrengthMessage("Weak password");
    } else if (strength <= 80) {
      setStrengthMessage("Medium password");
    } else {
      setStrengthMessage("Strong password");
    }
  };

  // Check if email already exists
  const checkEmailExists = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError("Email already exists");
        setFormData({ email: "", password: "", confirmPassword: "" }); // Clear email and password
      } else {
        setEmailError(""); // Clear error if email doesn't exist
      }
    } catch (error) {
      console.error("Error checking email: ", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore, including 'firstLogin' flag set to true
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        firstLogin: true, // Flag indicating first login
      });

      setSuccess("Signup successful! Redirecting to login page...");

      // Reset form data
      setFormData({ email: "", password: "", confirmPassword: "" });

      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      console.error("Error during signup: ", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-center mt-4 name">SoulSolution</div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {emailError && (
        <div className="alert alert-danger">{emailError}</div>
      )}{" "}
      {/* Display email error */}
      <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              const email = e.target.value;
              setFormData({ ...formData, email });
              checkEmailExists(email); // Check email while typing
            }}
            required
          />
        </div>

        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              const password = e.target.value;
              setFormData({ ...formData, password });
              checkPasswordStrength(password); // Check strength as user types
            }}
            required
          />
        </div>

        <div
          className="progress"
          style={{
            height: "10px",
            backgroundColor: "#e0e0e0",
            marginTop: "5px",
          }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${passwordStrength}%`,
              backgroundColor:
                passwordStrength <= 40
                  ? "red"
                  : passwordStrength <= 80
                  ? "orange"
                  : "green",
            }}
            aria-valuenow={passwordStrength}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>

        {strengthMessage && (
          <div
            className="password-strength-message"
            style={{
              color:
                passwordStrength <= 40
                  ? "red"
                  : passwordStrength <= 80
                  ? "orange"
                  : "green",
              marginTop: "5px",
            }}
          >
            {strengthMessage}
          </div>
        )}

        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <button className="btn mt-3" type="submit" disabled={emailError !== ""}>
          {" "}
          {/* Disable button if email is invalid */}
          Sign Up
        </button>
      </form>
      <div className="text-center fs-6">
        <span className="already-have-account">Already have an account? </span>
        <Link to="/" className="login-link">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
