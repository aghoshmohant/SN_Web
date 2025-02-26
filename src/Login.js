import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/head-register/login",
        { email, password }
      );

      if (response.data.message === "Login successful") {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("districtHeadId", response.data.id || response.data.user?.id); // Store the ID
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login");
    } finally {
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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