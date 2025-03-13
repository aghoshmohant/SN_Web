import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/"); // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div>
      <div className="nav">
        <div>
          <img src="/assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
        {/* Profile icon replacing logout */}
        <div className="profile-icon-container">
          <Link to="/profile">
            <img src="/assets/icons/user.png" alt="Profile" className="profile-icon" />
          </Link>
        </div>
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

        <Link to="/contacts">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/call.png" alt="requirement items" className="icon" />
            </div>
            <div className="icon-text">
              <p>Emergency Contacts</p>
            </div>
          </div>
        </Link>

        <Link to="/bloodBanks">
          <div className="items">
            <div className="icon-box">
              <img src="/assets/icons/blood-donation.png" alt="requirement items" className="icon" />
            </div>
            <div className="icon-text">
              <p>Blood Bank</p>
            </div>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default Home;
