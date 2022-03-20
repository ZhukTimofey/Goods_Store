import React from "react";
import LoginPage from "./LoginPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./SignupPage";

const ApplicationContainer = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </div>
  );
};

export default ApplicationContainer;
