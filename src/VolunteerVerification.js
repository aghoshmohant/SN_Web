import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const VolunteerVerification = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // Navigates to the home page
  };

  return (
    <div>
      <div className="nav">
        <div className="back" onClick={handleBackClick} style={{ cursor: "pointer" }}>
          <img src="assets/icons/back-button.png" alt="logout" className="back-icon" />
        </div>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Volunteer Verification</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Blood Group</th>
              <th>Location</th>
              <th>Category</th>
              <th>Certificate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aghosh Mohan T</td>
              <td>aghoshmohant@gmail.com</td>
              <td>8590650812</td>
              <td>B+</td>
              <td>Fire</td>
              <td></td>
              <td><img src="" alt="not found" /></td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="reject-btn">Reject</button>
              </td>
            </tr>
            <tr>
              <td>Aghosh Mohan T</td>
              <td>aghoshmohant@gmail.com</td>
              <td>8590650812</td>
              <td>B+</td>
              <td>Nanminda</td>
              <td>Fire</td>
              <td></td>
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

export default VolunteerVerification;
