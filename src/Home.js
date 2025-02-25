import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authToken exists in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is missing
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className="nav">
        <div>
          <img src="/assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
        <Link to="/profile">
          <div className="logout">
            <img src="/assets/icons/volunteer.png" alt="logout" className="profile-icon" />
          </div>
        </Link>
      </div>

      <div className="body">
        <Link to="/volunteer-verification">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/volunteer.png" alt="volunteer" className="icon" />
            </div>
            <div className="icon-text">
              <p>Volunteer Verification</p>
            </div>
          </div>
        </Link>

        <Link to="/organization-verification">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/organization.png" alt="organization" className="icon" />
            </div>
            <div className="icon-text">
              <p>Organization Verification</p>
            </div>
          </div>
        </Link>

        <Link to="/disaster-verification">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/disaster.png" alt="disaster" className="icon" />
            </div>
            <div className="icon-text">
              <p>Disaster Verification</p>
            </div>
          </div>
        </Link>

        <Link to="/call-volunteer">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/volunteer-1.png" alt="call for volunteer" className="icon" />
            </div>
            <div className="icon-text">
              <p>Call for Volunteers</p>
            </div>
          </div>
        </Link>

        <Link to="/call-vehicle">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/car.png" alt="call for vehicle" className="icon" />
            </div>
            <div className="icon-text">
              <p>Call for Vehicle</p>
            </div>
          </div>
        </Link>

        <Link to="/shelter-details">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/shelter.png" alt="temporary shelter" className="icon" />
            </div>
            <div className="icon-text">
              <p>Temporary Shelter</p>
            </div>
          </div>
        </Link>

        <Link to="/requirement-items">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/shopping-bag.png" alt="requirement items" className="icon" />
            </div>
            <div className="icon-text">
              <p>Requirement Items</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
