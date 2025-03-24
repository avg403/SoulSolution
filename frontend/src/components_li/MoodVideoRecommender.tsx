import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { videoLibrary } from "./videoLibrary";

// Define the mood types
type MoodType = "HAPPY" | "EXCITED" | "RELAXED" | "NEUTRAL" | "CONFUSED" | "BORED" | "SAD" | "ANGRY";

// Define the structure of a video object
interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// Available moods
const MOODS: MoodType[] = [
  "HAPPY",
  "EXCITED",
  "RELAXED",
  "NEUTRAL",
  "CONFUSED",
  "BORED",
  "SAD",
  "ANGRY",
];

// Sample video library if the imported one isn't working
const fallbackVideoLibrary: Record<MoodType, Video[]> = {
  "HAPPY": [
    { id: "h1", title: "Cute Puppies Playing", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/237/320/180" },
    { id: "h2", title: "Best Comedy Moments", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/30/320/180" },
    { id: "h3", title: "Beautiful Sunrise Time-lapse", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/96/320/180" }
  ],
  "EXCITED": [
    { id: "e1", title: "Amazing Sports Moments", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/36/320/180" },
    { id: "e2", title: "Roller Coaster Experience", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/46/320/180" }
  ],
  "RELAXED": [
    { id: "r1", title: "Ocean Waves Sounds", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/152/320/180" },
    { id: "r2", title: "Meditation Guide", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/129/320/180" }
  ],
  "NEUTRAL": [
    { id: "n1", title: "Daily News Recap", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/20/320/180" },
    { id: "n2", title: "Documentary on Climate", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/28/320/180" },
    { id: "n3", title: "How Things Work", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/76/320/180" }
  ],
  "CONFUSED": [
    { id: "c1", title: "Explain Like I'm Five", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/175/320/180" },
    { id: "c2", title: "Mind-bending Illusions", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/91/320/180" }
  ],
  "BORED": [
    { id: "b1", title: "Top 10 Interesting Facts", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/39/320/180" },
    { id: "b2", title: "Learn a New Skill", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/24/320/180" }
  ],
  "SAD": [
    { id: "s1", title: "Inspirational Stories", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/65/320/180" },
    { id: "s2", title: "Motivational Speeches", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/22/320/180" }
  ],
  "ANGRY": [
    { id: "a1", title: "Calming Techniques", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/106/320/180" },
    { id: "a2", title: "Stress Relief Music", url: "https://www.youtube.com", thumbnail: "https://picsum.photos/id/146/320/180" }
  ]
};

const MoodVideoRecommender: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType>("NEUTRAL");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [headingText, setHeadingText] = useState<string>("EmotionFlix: Videos for Every Feeling");
  const [showEmojis, setShowEmojis] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Try to get videos from the imported videoLibrary, fall back if needed
    let moodVideos: Video[] = [];
    
    try {
      // First try to use the imported videoLibrary
      if (videoLibrary && videoLibrary[selectedMood]) {
        moodVideos = videoLibrary[selectedMood];
      } else {
        // Fallback to our embedded library
        moodVideos = fallbackVideoLibrary[selectedMood];
      }
    } catch (error) {
      console.error("Error loading videos:", error);
      moodVideos = fallbackVideoLibrary[selectedMood];
    }
    
    // Simulate API delay
    setTimeout(() => {
      setVideos(moodVideos || []);
      setIsLoading(false);
    }, 400);

    // Apply background color to document body based on mood
    document.body.style.backgroundColor = getMoodColor();
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.transition = "background-color 0.3s ease";
    
  }, [selectedMood]);

  const openVideo = (url: string) => {
    window.open(url, "_blank");
  };

  // Function to get appropriate background color based on mood
  const getMoodColor = () => {
    switch (selectedMood) {
      case "HAPPY": return "#FFEB3B"; // Yellow
      case "EXCITED": return "#FF9800"; // Orange
      case "RELAXED": return "#4FC3F7"; // Light Blue
      case "NEUTRAL": return "#E0E0E0"; // Light Gray
      case "CONFUSED": return "#CE93D8"; // Light Purple
      case "BORED": return "#B0BEC5"; // Blue Gray
      case "SAD": return "#90CAF9"; // Baby Blue
      case "ANGRY": return "#FF5252"; // Red
      default: return "#E0E0E0"; // Default Light Gray
    }
  };

  // Function to get appropriate text color based on mood
  const getMoodTextColor = () => {
    switch (selectedMood) {
      case "HAPPY": 
      case "EXCITED": 
      case "RELAXED": 
      case "NEUTRAL": 
      case "CONFUSED": 
      case "BORED": 
      case "SAD": return "#212121"; // Dark text for light backgrounds
      case "ANGRY": return "#FFFFFF"; // White text for dark backgrounds
      default: return "#212121";
    }
  };

  // Function to get emojis for each mood
  const getMoodEmojis = () => {
    switch (selectedMood) {
      case "HAPPY": return "😊 😄 🥳";
      case "EXCITED": return "🤩 🎉 ⭐";
      case "RELAXED": return "😌 🧘 🌊";
      case "NEUTRAL": return "😐 📊 🔍";
      case "CONFUSED": return "🤔 ❓ 🧩";
      case "BORED": return "😴 🥱 ⏱️";
      case "SAD": return "😢 🌧️ 💭";
      case "ANGRY": return "😠 🔥 💢";
      default: return "📺 🎬 🎦";
    }
  };

  // Function to toggle emoji visibility
  const toggleEmojiVisibility = () => {
    setShowEmojis(!showEmojis);
  };

  // Function to create emoji background pattern
  const createEmojiBackground = () => {
    if (!showEmojis) return null;
    
    const emojis = getMoodEmojis().split(' ');
    const background = [];
    
    // Create a repeated pattern of emojis
    for (let i = 0; i < 50; i++) {
      const emoji = emojis[i % emojis.length];
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.15 + 0.05; // Increased opacity between 0.05 and 0.2
      const size = Math.random() * 1.8 + 0.8; // Increased size between 0.8em and 2.6em
      
      background.push(
        <div 
          key={`emoji-${i}`} 
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            fontSize: `${size}em`,
            opacity: opacity,
            transform: 'rotate(' + (Math.random() * 40 - 20) + 'deg)',
            pointerEvents: 'none', // Make the emojis non-interactive
            zIndex: 0
          }}
        >
          {emoji}
        </div>
      );
    }
    
    return background;
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      overflow: "hidden", // Keep emojis contained
      boxSizing: "border-box"
    }}>
      {/* Emoji Background */}
      <div style={{
        position: "fixed", // Changed to fixed to cover entire viewport
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        display: showEmojis ? "block" : "none" // Control visibility
      }}>
        {createEmojiBackground()}
      </div>
      
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "30px",
        textAlign: "center",
        position: "relative", // Keep content above emojis
        zIndex: 1
      }}>
        {/* Title */}
        <div style={{
          marginBottom: "30px",
          position: "relative"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            color: "#333",
            fontWeight: "bold",
            margin: "0 auto",
            maxWidth: "85%" // Leave space for the toggle button
          }}>
            {headingText}
          </h1>
          
          {/* Emoji Toggle Button - Moved to a better position */}
          <button 
            onClick={toggleEmojiVisibility}
            style={{
              position: "absolute",
              top: "5px", // Positioned at top
              right: "10px", // Right aligned
              backgroundColor: getMoodColor(),
              color: getMoodTextColor(),
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}
            title={showEmojis ? "Hide Emoji Background" : "Show Emoji Background"}
          >
            {showEmojis ? "🙈" : "🙉"}
          </button>
        </div>

        {/* Mood Selector */}
        <div style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center"
        }}>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value as MoodType)}
            style={{
              padding: "12px 40px 12px 20px",
              fontSize: "1.1rem",
              backgroundColor: getMoodColor(),
              color: getMoodTextColor(),
              border: "none",
              borderRadius: "30px",
              appearance: "none",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 15px center",
              backgroundSize: "12px"
            }}
          >
            {MOODS.map((mood) => (
              <option key={mood} value={mood}>
                {mood.charAt(0) + mood.slice(1).toLowerCase()} {showEmojis ? getMoodEmojis().split(' ')[0] : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Status Message */}
        <div style={{ marginBottom: "20px" }}>
          {isLoading ? (
            <p style={{ fontSize: "1.2rem", color: "#757575" }}>
              Finding the perfect videos for your mood...
            </p>
          ) : (
            <p style={{ fontSize: "1.2rem", color: "#757575" }}>
              Here are some videos that match your{" "}
              <span style={{ 
                fontWeight: "bold", 
                color: getMoodTextColor() === "#FFFFFF" ? "#FF5252" : getMoodColor(),
                backgroundColor: getMoodTextColor() === "#FFFFFF" ? "#FFFFFF" : "transparent",
                padding: getMoodTextColor() === "#FFFFFF" ? "2px 8px" : "0",
                borderRadius: "4px"
              }}>
                {selectedMood.toLowerCase()} {showEmojis ? getMoodEmojis().split(' ')[0] : ''}
              </span>{" "}
              mood:
            </p>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              border: "5px solid #f3f3f3",
              borderTop: `5px solid ${getMoodColor()}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}>
            {videos.map((video) => (
              <div 
                key={video.id} 
                onClick={() => openVideo(video.url)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  margin: "0 auto",
                  maxWidth: "300px",
                  border: `1px solid ${getMoodColor()}30`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                }}
              >
                {/* Video Thumbnail */}
                <div style={{ position: "relative" }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      display: "block"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://picsum.photos/320/180";
                    }}
                  />
                  {/* Play Button Overlay */}
                  <div 
                    className="play-overlay"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease"
                    }}
                  >
                    <div style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft: "15px solid #333",
                        marginLeft: "5px"
                      }}></div>
                    </div>
                  </div>
                  <style>{`
                    .play-overlay:hover {
                      opacity: 1 !important;
                    }
                  `}</style>
                </div>
                
                {/* Video Title */}
                <div style={{ padding: "15px" }}>
                  <h3 style={{ 
                    fontSize: "1.1rem", 
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                    color: "#333"
                  }}>
                    {video.title}
                  </h3>
                  <p style={{ 
                    fontSize: "0.9rem", 
                    color: "#757575",
                    margin: 0
                  }}>
                    Click to watch
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Videos Message */}
        {!isLoading && videos.length === 0 && (
          <div style={{
            padding: "30px",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            marginTop: "20px"
          }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 15px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p style={{ fontSize: "1.2rem", color: "#757575" }}>
              No videos found for this mood. Try another one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodVideoRecommender;