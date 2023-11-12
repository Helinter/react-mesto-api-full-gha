import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
 
  const token = sessionStorage.getItem('token');

  return (
    token ? <Component {...props}/> : <Navigate to='/sign-in' replace/>
  );
};

export default ProtectedRouteElement;
