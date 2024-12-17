import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase import
import "./AssessmentForm.css"; // Import the CSS for styling

// Define the type for the form data
interface FormData {
  username: string;
  age: string;
  gender: string;
  occupation: string;
  mood: string;
  stressFrequency: string;
  sleepQuality: string;
  professionalHelp: string;
  copingStrategies: string;
}

const AssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "John Doe", // Default name
    age: "25", // Default age
    gender: "", // Default gender
    occupation: "Student", // Default occupation
    mood: "",
    stressFrequency: "",
    sleepQuality: "",
    professionalHelp: "",
    copingStrategies: "",
  });

  const [error, setError] = useState<string>(""); // Error message state
  const [loading, setLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component load
  }, []);

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
    if (
      !formData.username ||
      !formData.age ||
      !formData.gender ||
      !formData.occupation
    ) {
      setError("Please fill in all required fields.");
      window.scrollTo(0, 0); // Scroll to top on error
      return;
    }

    if (parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) {
      setError("Please enter a valid age.");
      window.scrollTo(0, 0);
      return;
    }

    if (parseInt(formData.mood) < 1 || parseInt(formData.mood) > 10) {
      setError("Mood rating must be between 1 and 10.");
      window.scrollTo(0, 0);
      return;
    }

    if (
      parseInt(formData.sleepQuality) < 1 ||
      parseInt(formData.sleepQuality) > 10
    ) {
      setError("Sleep quality rating must be between 1 and 10.");
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true); // Prevent multiple submissions
    try {
      // Store data in Firebase Firestore
      await addDoc(collection(db, "assessments"), formData);
      console.log("Submitted Form Data:", formData);
      alert("Assessment Submitted Successfully!");

      // Reset form data
      setFormData({
        username: "John Doe",
        age: "25",
        gender: "",
        occupation: "Student",
        mood: "",
        stressFrequency: "",
        sleepQuality: "",
        professionalHelp: "",
        copingStrategies: "",
      });

      window.scrollTo(0, 0); // Scroll to top after submission
      // Navigate to the chat interface
      navigate("/chatinterface");
    } catch (error) {
      console.error("Error submitting form: ", error);
      setError(
        "There was an error submitting the assessment. Please try again."
      );
      window.scrollTo(0, 0); // Scroll to top on error
    } finally {
      setLoading(false);
    }
  };

  return (
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

        {/* Wrap Age and Gender fields in the same row */}
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

        {/* Other fields can follow the same layout logic */}
        {Object.entries(formData).map(
          ([key, value]) =>
            key !== "username" &&
            key !== "age" &&
            key !== "gender" &&
            key !== "mentalHealth" &&
            key !== "stressSources" && (
              <div className="mb-3" key={key}>
                <label htmlFor={key} className="form-label">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={
                    key === "mood" || key === "sleepQuality" ? "text" : "text"
                  }
                  id={key}
                  name={key}
                  className="form-control"
                  value={value}
                  onChange={handleChange}
                  placeholder={`Enter your ${key}`}
                  required={key !== "copingStrategies"}
                />
              </div>
            )
        )}

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Finish Assessment"}
        </button>
      </form>
    </div>
  );
};

export default AssessmentForm;
