import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./style.css";
import "./style2.css";

const VolunteerCall = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="nav">
        {/* Change the anchor tag to Link for proper routing */}
        <Link to="/">
          <div className="back">
            <img
              src="assets/icons/back-button.png"
              alt="Back"
              className="back-icon"
            />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>
      <div className="main">
        <h1 className="title">Call for volunteers</h1>
        <button className="btn" onClick={openPopup}>
          New
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Category</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SafeNet</td>
              <td>aghoshmohant@gmail.com</td>
              <td>8590650812</td>
              <td>
                <button className="reject-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <div className="body1" id="popupOverlay" onClick={(e) => e.target.id === "popupOverlay" && closePopup()}>
          <div className="box">
            <img
              src="./assets/icons/close.png"
              alt="Close"
              className="close"
              onClick={closePopup}
            />
            <div>
              <label htmlFor="location" className="lab">
                Location
              </label>
              <input type="text" name="location" id="" className="inp" />
            </div>
            <div>
              <label htmlFor="district" className="lab">
                District
              </label>
              <input type="text" name="district" id="" className="inp" />
            </div>
            <div>
              <label htmlFor="category" className="lab">
                Category
              </label>
              <input type="text" name="category" id="" className="inp" />
            </div>
            <div>
              <label htmlFor="count" className="lab">
                Count
              </label>
              <input type="number" name="count" id="" className="inp" />
            </div>
            <div>
              <button className="submit">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCall;
