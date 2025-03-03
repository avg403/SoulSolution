import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Firebase import
import "bootstrap/dist/css/bootstrap.min.css";
import "./AssessmentForm.css"; // Import the CSS for styling

// Define the type for the form data
interface FormData {
  username: string;
  age: string;
  gender: string;
  mood: string;
  stressFrequency: string;
  professionalHelp: string;
}

const AssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: "",
    gender: "",
    mood: "",
    stressFrequency: "",
    professionalHelp: "",
  });

  const [error, setError] = useState<string>(""); // Error message state
  const [loading, setLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if it's the first login
    const checkFirstLogin = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData?.firstLogin === false) {
            navigate("/dailymood"); // Redirect to daily mood check-in if not first login
          }
        }
      }
    };

    checkFirstLogin();
  }, [navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(""); // Reset error message

    // Basic client-side validation
    if (!formData.username || !formData.age || !formData.gender) {
      setError("Please fill in all required fields.");
      return;
    }

    if (parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) {
      setError("Please enter a valid age.");
      return;
    }

    setLoading(true); // Prevent multiple submissions
    try {
      // Store data in Firebase Firestore
      await addDoc(collection(db, "assessments"), formData);
      console.log("Submitted Form Data:", formData);

      // Reset form data
      setFormData({
        username: "",
        age: "",
        gender: "",
        mood: "",
        stressFrequency: "",
        professionalHelp: "",
      });

      // Update the firstLogin flag to false after the user completes the assessment
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          firstLogin: false,
        });
      }

      // Show modal after successful submission
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setError(
        "There was an error submitting the assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dailymood"); // Navigate to the next page after closing modal
  };

  return (
    <div className="assessment-form">
      <div className="container">
        <h2 className="text-center mb-4">Initial Assessment Form</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
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
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="1"
                max="120"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
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
            {loading ? "Submitting..." : "Finish Assessment"}
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex={-1}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
            </div>
            <div className="modal-body">
              <p>Assessment Submitted Successfully!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;
