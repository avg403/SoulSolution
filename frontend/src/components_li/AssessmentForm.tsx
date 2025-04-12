import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AssessmentForm.css";

interface FormData {
  username: string;
  age: string;
  gender: string;
  mood: string;
  stressFrequency: string;
  professionalHelp: string;
  profilePicture?: string;
}

const AssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: "",
    gender: "",
    mood: "",
    stressFrequency: "",
    professionalHelp: "",
    profilePicture: "",
  });

  const [error, setError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setDebugInfo("No user logged in");
          return;
        }

        setDebugInfo(`Current user: ${user.uid}`);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data()?.firstLogin === false) {
          navigate("/dailymood");
        }
      } catch (error) {
        console.error("Error checking first login:", error);
        setDebugInfo(
          "Error checking login status: " + (error as Error).message
        );
      }
    };
    checkFirstLogin();
  }, [navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Validate age when it changes
    if (name === "age") {
      validateAge(value);
    }
    
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate age
  const validateAge = (age: string) => {
    const ageNum = parseInt(age, 10);
    
    if (age === "") {
      setAgeError("");
      return false;
    } else if (isNaN(ageNum)) {
      setAgeError("Age must be a number");
      return false;
    } else if (ageNum < 1) {
      setAgeError("Age cannot be negative or zero");
      return false;
    } else if (ageNum > 120) {
      setAgeError("Age cannot be greater than 120");
      return false;
    } else {
      setAgeError("");
      return true;
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDebugInfo(
        `File selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
      );

      // Check file size (1MB limit for direct storage in Firestore)
      if (file.size > 1 * 1024 * 1024) {
        setError(
          "Image file is too large. Maximum size is 1MB for direct storage."
        );
        setDebugInfo("File too large (max 1MB)");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setDebugInfo("Invalid file type");
        return;
      }

      setImageFile(file);

      // Create image preview and store base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setDebugInfo("Form submission started");

    // Basic validation
    if (!formData.username || !formData.age) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate age before submission
    if (!validateAge(formData.age)) {
      setError("Please correct the age field before submitting.");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated");
      }

      // Prepare user data
      const userData = {
        firstLogin: false,
        username: formData.username,
        age: formData.age,
        gender: formData.gender || "",
        mood: formData.mood || "",
        stressFrequency: formData.stressFrequency || "",
        professionalHelp: formData.professionalHelp || "",
        // Store the base64 image data directly if available
        profilePicture: imagePreview || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to Firestore
      setDebugInfo("Saving user data to Firestore...");

      // Update the user document
      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      setDebugInfo("User data saved successfully");

      // Create assessment document
      await setDoc(doc(db, "assessments", user.uid), {
        ...userData,
        userId: user.uid,
      });

      setDebugInfo("Form submitted successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setError(`Error: ${(error as Error).message}`);
      setDebugInfo(`Form submission failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dailymood");
  };

  return (
    <div className="assessment-form">
      <div className="container">
        <h2 className="text-center mb-4">Initial Assessment Form</h2>

        {/* Profile Picture Preview - WhatsApp Style */}
        <div className="profile-picture-container mb-4">
          <div className="profile-picture-wrapper">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="profile-picture-preview"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <i className="bi bi-person-fill"></i>
              </div>
            )}
            <div className="profile-picture-overlay">
              <label htmlFor="profilePicture" className="profile-picture-label">
                <i className="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="profile-picture-input"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Rest of your form remains the same */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className={`form-control ${ageError ? 'is-invalid' : ''}`}
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age (1-120)"
                min="1"
                max="120"
                required
              />
              {ageError && <div className="invalid-feedback">{ageError}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="mood" className="form-label">
              How do you usually feel most of the time?
            </label>
            <select
              id="mood"
              name="mood"
              className="form-select"
              value={formData.mood}
              onChange={handleChange}
              required
            >
              <option value="">Select Mood</option>
              <option value="Happy">Happy</option>
              <option value="Neutral">Neutral</option>
              <option value="Sad">Sad</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="stressFrequency" className="form-label">
              Stress Frequency
            </label>
            <select
              id="stressFrequency"
              name="stressFrequency"
              className="form-select"
              value={formData.stressFrequency}
              onChange={handleChange}
              required
            >
              <option value="">Select Frequency</option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Often">Often</option>
              <option value="Very Often">Very Often</option>
              <option value="Always">Always</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="professionalHelp" className="form-label">
              Have you ever received professional help before?
            </label>
            <select
              id="professionalHelp"
              name="professionalHelp"
              className="form-select"
              value={formData.professionalHelp}
              onChange={handleChange}
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting...
              </>
            ) : (
              "Finish Assessment"
            )}
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h5>Success</h5>
            <p>Assessment Submitted Successfully!</p>
            <button className="btn btn-primary" onClick={handleModalClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentForm;