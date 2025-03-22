import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
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
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [strengthMessage, setStrengthMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isCheckingEmail, setIsCheckingEmail] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const navigate = useNavigate();

  // Remove the problematic useEffect that was causing auto-redirect
  // We don't need to monitor auth state on the signup page

  // Email format validation
  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if email already exists in Firebase
  const checkEmailExists = async (email: string) => {
    if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    try {
      setIsCheckingEmail(true);
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError(
          "Email already exists. Please use a different email or login."
        );
        setIsCheckingEmail(false);
        return true;
      } else {
        setEmailError("");
        setIsCheckingEmail(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking email: ", error);
      setEmailError("Error verifying email. Please try again.");
      setIsCheckingEmail(false);
      return false;
    }
  };

  // Handle email change with debounce
  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, email });

    if (!email) {
      setEmailError("");
      return;
    }

    // Basic format validation first
    if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Use setTimeout for debouncing
    if (window.emailCheckTimeout) {
      clearTimeout(window.emailCheckTimeout);
    }

    setIsCheckingEmail(true);
    window.emailCheckTimeout = setTimeout(() => {
      checkEmailExists(email);
    }, 500);
  };

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (length >= 8) strength += 20;
    if (hasUpperCase) strength += 20;
    if (hasLowerCase) strength += 20;
    if (hasNumbers) strength += 20;
    if (hasSpecialChars) strength += 20;

    setPasswordStrength(strength);

    if (strength <= 40) {
      setStrengthMessage("Weak password");
    } else if (strength <= 80) {
      setStrengthMessage("Medium password");
    } else {
      setStrengthMessage("Strong password");
    }
  };

  // Resend verification email function
  const resendVerificationEmail = async () => {
    try {
      if (!auth.currentUser) {
        setError("No user signed in. Please refresh and try again.");
        return;
      }

      await sendEmailVerification(auth.currentUser);
      setSuccess("Verification email resent. Please check your inbox.");
    } catch (error: any) {
      setError(`Failed to resend verification email: ${error.message}`);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password, confirmPassword } = formData;

    // Final validations
    if (!validateEmailFormat(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength < 60) {
      setError("Please use a stronger password");
      return;
    }

    // Check if email exists one last time
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return;
    }

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        firstLogin: true,
        emailVerified: false, // Will be updated when user verifies
        createdAt: new Date().toISOString(),
      });

      // Sign out the user until they verify their email
      await auth.signOut();

      setVerificationSent(true);
      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );

      // Clear form
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      console.error("Error during signup: ", error.message);
      setError(error.message);
    }
  };

  // If verification email is sent, show verification instructions
  if (verificationSent) {
    return (
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-center mt-4 name">SoulSolution</div>

        <div className="email-verification-container p-4 text-center">
          <h2>Verify Your Email</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="verification-message my-4">
            <p>We've sent a verification Link to your email account</p>
            <p>
              Please check your inbox and click the verification link to
              complete your registration.
            </p>
            <p className="text-muted small">
              If you don't see the email, check your spam folder.
            </p>
          </div>

          <div className="verification-actions">
            <button
              className="btn mt-3 w-100"
              onClick={resendVerificationEmail}
            >
              Resend Link
            </button>

            <div className="mt-3">
              <Link to="/login" className="btn btn-secondary w-100">
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular signup form
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-center mt-4 name">SoulSolution</div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
          />
        </div>

        {isCheckingEmail && (
          <div className="text-info small">Checking email...</div>
        )}
        {emailError && <div className="text-danger small">{emailError}</div>}

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
              checkPasswordStrength(password);
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

        <button
          className="btn mt-3"
          type="submit"
          disabled={isCheckingEmail || !!emailError}
        >
          {isCheckingEmail ? "Checking..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center fs-6">
        <span className="already-have-account">Already have an account? </span>
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </div>
    </div>
  );
};

// Declare window.emailCheckTimeout for TypeScript
declare global {
  interface Window {
    emailCheckTimeout: NodeJS.Timeout;
  }
}

export default Signup;