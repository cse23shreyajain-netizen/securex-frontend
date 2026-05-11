import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Options from "./pages/Options";
import PasswordCheck from "./pages/PasswordCheck";
import IndividualCheck from "./pages/IndividualCheck";

import PhishingCheck from "./pages/PhishingCheck";

import AuthChoice from "./pages/AuthChoice";

import Login from "./pages/Login";
import Register from "./pages/Register";

import SecurityDashboard from "./pages/SecurityDashboard";
import CyberAssistant from "./pages/CyberAssistant";
import ScanHistory from "./pages/ScanHistory";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Options Page */}
      <Route path="/options" element={<Options />} />

      {/* Individual Check Page */}
      <Route path="/individual" element={<IndividualCheck />} />

      {/* Step 1 - Password */}
      <Route path="/password" element={<PasswordCheck />} />

  

      <Route path="/phishing" element={<PhishingCheck />} />

    

      

      <Route path="/auth" element={<AuthChoice />} />

      
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route path="/profile" element={<Profile />} />

<Route
  path="/assistant"
  element={<CyberAssistant />}
/>
<Route
  path="/dashboard"
  element={<SecurityDashboard />}
/>

<Route
  path="/history"
  element={<ScanHistory />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

      {/* Future routes (we will build next) */}
    
      <Route path="/phishing" element={<div>Phishing Page</div>} />
      
      
    </Routes>
  );
}

export default App;