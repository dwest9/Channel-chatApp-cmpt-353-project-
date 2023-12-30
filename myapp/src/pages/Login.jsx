// david emmanuel doe869

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext"; // Importing useUserContext
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  // Use useUserContext to access and set user-related state
  const { setIsLoggedIn, setUsername, setUserId } = useUserContext();

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Must enter both email and password");
      return;
    }

    const loginData = {
      email,
      password,
    };

    fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login Successful:", data);
        setUsername(data.username);
        setUserId(data.userId);
        setIsLoggedIn(true); // Update login status
        setModalMessage("Login successful!");
        setShowModal(true);
        setTimeout(() => {
          navigate("/"); // Redirect after successful login to home page
        }, 2000);
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setModalMessage("Login failed. Please try again.");
        setShowModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <span className="logo">Dave Chat-app</span>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </div>

      {/* Login Status Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
