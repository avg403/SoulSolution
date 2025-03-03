import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Firestore, auth } from "../firebase"; // Import Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DataVisualization: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [moodData, setMoodData] = useState<any>({});
  const navigate = useNavigate();

  // Inline styles
  const styles = {
    chartContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column" as "column",
      height: "450px",
      width: "450px",
      margin: "50px",
    },
    chartTitle: {
      textAlign: "center" as "center",
      lineHeight: 1.5,
      color: "black",
      marginTop: "20px",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginBottom: "20px",
    },
    pageTitle: {
      color: "black",
      textAlign: "center" as "center",
      marginBottom: "20px",
    },
  };

  const formatDate = (date: string) =>
    new Date(date).toISOString().split("T")[0];

  const getWeek = (date: Date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
      (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((days + startDate.getDay() + 1) / 7);
  };

  const fetchMoodData = async (timeFrame: "daily" | "weekly" | "monthly") => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(Firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const moodHistory = userData?.moodHistory || [];
          const today = new Date().toISOString().split("T")[0];

          let filteredData = moodHistory.filter((entry: any) => {
            const entryDate = formatDate(entry.timestamp);
            if (timeFrame === "daily") {
              return entryDate === today;
            } else if (timeFrame === "weekly") {
              const currentWeek = getWeek(new Date(today));
              const entryWeek = getWeek(new Date(entryDate));
              return currentWeek === entryWeek;
            } else if (timeFrame === "monthly") {
              const currentMonth = new Date(today).getMonth();
              const entryMonth = new Date(entryDate).getMonth();
              return currentMonth === entryMonth;
            }
            return false;
          });

          const groupedMoods: any = {};
          filteredData.forEach((entry: any) => {
            const mood = entry.mood;
            groupedMoods[mood] = groupedMoods[mood]
              ? groupedMoods[mood] + 1
              : 1;
          });

          setMoodData(groupedMoods);
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMoodData(timeFrame);
  }, [timeFrame]);

  const chartData = {
    labels: Object.keys(moodData),
    datasets: [
      {
        data: Object.values(moodData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#FF5733",
          "#9C27B0",
          "#00BCD4",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce(
              (sum: number, value: number) => sum + value,
              0
            );
            const currentValue = tooltipItem.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
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

      <div>
        <h1 style={styles.pageTitle}>Data Visualization Page</h1>

        <div style={styles.buttonGroup}>
          <button onClick={() => setTimeFrame("daily")}>Daily</button>
          <button onClick={() => setTimeFrame("weekly")}>Weekly</button>
          <button onClick={() => setTimeFrame("monthly")}>Monthly</button>
        </div>

        <div style={styles.chartContainer}>
          <Pie data={chartData} options={chartOptions} />
          <h3 style={styles.chartTitle}>
            {`Mood Data for ${
              timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)
            }`}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
