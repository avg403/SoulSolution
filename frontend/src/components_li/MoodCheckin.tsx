import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoodCheckIn.css"; // External CSS file
import moodcheck from "../../Image/moodcheckin.png"; // Adjust the path to your image

const MoodCheckIn: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track successful submission
  const navigate = useNavigate();

  // Mood options with emojis and labels
  const moodOptions = [
    { emoji: "😊", label: "Happy" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "😌", label: "Relaxed" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😕", label: "Confused" },
    { emoji: "😑", label: "Bored" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😡", label: "Angry" },
  ];

  // Handle mood selection
  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedMood) {
      setModalMessage("Please select a mood before submitting.");
      setShowModal(true);
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const today = new Date().toISOString();

        // Update Firestore with mood and timestamp (add to an array)
        await updateDoc(userDocRef, {
          moodHistory: arrayUnion({
            mood: selectedMood,
            timestamp: today,
          }),
        });

        setModalMessage(`Mood Submitted: ${selectedMood}`);
        setSubmitted(true); // Mark as submitted
        setShowModal(true);
        setSelectedMood(null);
      } else {
        setModalMessage("User not logged in. Please log in to continue.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error saving mood to Firestore:", error);
      setModalMessage("Failed to submit mood. Please try again.");
      setShowModal(true);
    }
  };

  // Handle close button click
  const handleClose = () => {
    navigate("/chatinterface");
  };

  return (
    <div className="mood-checkin-container">
      {/* Close Button (Cross Symbol) */}
      <button className="close-page-button" onClick={handleClose}>
        ×
      </button>

      <img src={moodcheck} alt="Mood Check-in" className="mood-checkin-image" />
      <div className="mood-options">
        {moodOptions.map((option, index) => (
          <div
            key={index}
            className={`mood-option ${
              selectedMood === option.label ? "active" : ""
            }`}
            onClick={() => handleMoodSelection(option.label)}
          >
            <span className="mood-emoji">{option.emoji}</span>
            <span className="mood-label">{option.label}</span>
          </div>
        ))}
      </div>

      <button className="submit-button2" onClick={handleSubmit}>
        Submit
      </button>

      {/* Modal for popup alerts */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowModal(false);
                  if (submitted) {
                    navigate("/chatinterface");
                  }
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodCheckIn;
