import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./DailyMoodCheckin.css";
import dailymood from "../../Image/dailyhead.png"; // Use the same image as MoodCheckIn

const DailyMoodCheckin: React.FC = () => {
  const [dailyMood, setDailyMood] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

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

  const handleMoodSelect = (selectedMood: string) => {
    setDailyMood(selectedMood);
  };

  const handleSubmit = async () => {
    if (!dailyMood) {
      setModalMessage("Please select a mood before submitting.");
      setShowModal(true);
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const today = new Date().toISOString();

        await updateDoc(userDocRef, {
          lastMoodCheckin: today,
          dailyMood,
        });

        setSubmitted(true);
        setModalMessage(`Mood Submitted: ${dailyMood}`);
        setShowModal(true);
      } else {
        setModalMessage("User not logged in. Please log in to continue.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating lastMoodCheckin in Firestore:", error);
      setModalMessage("Failed to submit mood. Please try again later.");
      setShowModal(true);
    }
  };

  useEffect(() => {
    const checkMoodStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const today = new Date().toISOString().split("T")[0];
          const lastMoodCheckin = userData?.lastMoodCheckin?.split("T")[0];

          if (lastMoodCheckin === today) {
            setSubmitted(true);
            navigate("/chatinterface");
          }
        }
      }
    };

    checkMoodStatus();
  }, [navigate]);

  return (
    <div className="daily-mood-checkin-container">
      <div className="daily-mood-checkin-background"></div>{" "}
      {/* Background layer */}
      <div className="mood-checkin-container">
        <img
          src={dailymood}
          alt="Mood Check-in"
          className="daily-mood-checkin-image"
        />
        <div className="mood-options">
          {moodOptions.map((option, index) => (
            <div
              key={index}
              className={`mood-option ${
                dailyMood === option.label ? "active" : ""
              }`}
              onClick={() => handleMoodSelect(option.label)}
            >
              <span className="mood-emoji">{option.emoji}</span>
              <span className="mood-label">{option.label}</span>
            </div>
          ))}
        </div>

        <button className="submit-button1" onClick={handleSubmit}>
          Submit
        </button>
      </div>
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

export default DailyMoodCheckin;
