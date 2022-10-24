import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p>Loading</p>;
  }
  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location }}>
        {" "}
      </Navigate>
    );
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
