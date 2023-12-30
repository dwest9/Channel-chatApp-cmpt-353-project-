// david emmanuel doe869

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Registration.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password || !email) {
      alert("Please fill in all required fields");
      return;
    }

    const userData = {
      username,
      password,
      email,
    };

    fetch("http://localhost:5002/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed.");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Redirect to login page after closing the modal
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="registration-container">
        <h2>Register</h2>
        <span className="logo">Dave Chat-app</span>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Form fields */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input type="file" />

          <button type="submit">Register</button>
        </form>

        {/* Modal for successful registration */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please log in with your new account.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Registration;
