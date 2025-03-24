import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components_li/Login";
import Signup from "./components_li/Signup";
import ForgotPassword from "./components_li/ForgotPassword"; // Forgot Password component
import AssessmentForm from "./components_li/AssessmentForm";
import DailyMoodCheckin from "./components_li/DailyMoodCheckin";
import ChatInterface from "./components_li/ChatInterface";
import PrivateRoute from "./components_li/PrivateRoute"; // Private route for protected pages
import MoodCheckin from "./components_li/MoodCheckin";
import DataVisualization from "./components_li/DataVisualization";
import Home from "./components_li/Home";
import MoodVideoRecommender from "./components_li/MoodVideoRecommender";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route - Redirect to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Home Route */}
        <Route
          path="/home"
          element={
            <div className="home-background">
              <Home />
            </div>
          }
        />

        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password Route */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <AssessmentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dailymood"
          element={
            <PrivateRoute>
              <DailyMoodCheckin />
            </PrivateRoute>
          }
        />
        <Route
          path="/chatinterface"
          element={
            <PrivateRoute>
              <ChatInterface />
            </PrivateRoute>
          }
        />

<Route>
  <Route path="/mood-video-recommender" element={<MoodVideoRecommender />} />
</Route>

        <Route
          path="/mood-checkin"
          element={
            <PrivateRoute>
              <MoodCheckin />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-visualization"
          element={
            <PrivateRoute>
              <DataVisualization />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
