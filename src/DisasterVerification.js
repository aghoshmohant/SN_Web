import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./style.css";

const DisasterVerification = () => {
  return (
    <div>
      <div className="nav">
        <Link to="/"> {/* Redirects to the home page */}
          <div className="back">
            <img
              src="assets/icons/back-button.png"
              alt="Back to Home"
              className="back-icon"
            />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Disaster Verification</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Photo</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wayanade</td>
              <td>Wayanade</td>
              <td>12/12/12</td>
              <td>
                <img src="" alt="Not Found" />
              </td>
              <td>Land slid</td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="reject-btn">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisasterVerification;
