import React from "react";
import LoginPage from "../LoginPage";
import { Route, Routes } from "react-router-dom";

const ApplicationContainer = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default ApplicationContainer;
