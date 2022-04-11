import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute: React.FC<{
  loggedIn: boolean;
  redirectTo: string;
  children: React.ReactElement;
}> = ({ children, loggedIn, redirectTo }) => {
    console.log("redirect to ", redirectTo)
  if (!loggedIn) {
    return <Navigate to={redirectTo} replace></Navigate>;
  }
  return children;
};
