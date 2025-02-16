import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./style.css";

const OrganizationVerification = () => {
  return (
    <div>
      <div className="nav">
        <Link to="/"> {/* Redirect to the home route */}
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
        <h1 className="title">Organization Verification</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SafeNet</td>
              <td>aghoshmohant@gmail.com</td>
              <td>8590650812</td>
              <td>Nanminda</td>
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

export default OrganizationVerification;
