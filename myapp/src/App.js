// david emmanuel doe869

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./pages/UserContext";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Registration from "./pages/Registration";
import Channel from "./pages/Channel";
function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/channels" element={<Channel />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
