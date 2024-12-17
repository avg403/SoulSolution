import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components_li/Login";
import Signup from "./components_li/Signup";
import AssessmentForm from "./components_li/AssessmentForm";
import PrivateRoute from "./components_li/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <AssessmentForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
