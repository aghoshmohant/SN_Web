import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css"; // Updated file name for styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Show loading when login is submitted

    try {
      const response = await axios.post(
        "http://localhost:5000/api/head-register/login",
        { email, password }
      );

      if (response.data.message === "Login successful") {
        localStorage.setItem("authToken", response.data.token); // Store JWT token
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login");
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  return (
    <div className="unique-login-container">
      <h1 className="unique-login-title">Login</h1>
      <form onSubmit={handleLogin} className="unique-login-form">
        <div className="unique-form-group">
          <label htmlFor="email" className="unique-label">Email</label>
          <input
            type="email"
            id="email"
            className="unique-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="unique-form-group">
          <label htmlFor="password" className="unique-label">Password</label>
          <input
            type="password"
            id="password"
            className="unique-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="unique-login-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <>
              Logging in...
              <div className="spinner spinner-inside-button"></div> {/* Spinner inside button */}
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      {error && <p className="unique-error-message">{error}</p>}
      <p className="unique-register-text">
        Don't have an account?{" "}
        <Link to="/register" className="unique-register-link">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
