import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
