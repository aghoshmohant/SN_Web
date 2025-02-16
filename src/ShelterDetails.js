import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './style2.css';

const ShelterDetails = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <div className="nav">
        <Link to="/">
          <div className="back">
            <img
              src="assets/icons/back-button.png"
              alt="home"
              className="back-icon"
            />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Shelter Details</h1>

        <button className="btn" onClick={openPopup}>
          New
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Location</th>
              <th>District</th>
              <th>Pincode</th>
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

      {popupVisible && (
        <div className="body1" id="popupOverlay" style={{ display: 'flex' }}>
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
              <input type="text" name="location" className="inp" />
            </div>
            <div>
              <label htmlFor="district" className="lab">
                District
              </label>
              <input type="text" name="district" className="inp" />
            </div>
            <div>
              <label htmlFor="category" className="lab">
                Pincode
              </label>
              <input type="text" name="category" className="inp" />
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

export default ShelterDetails;
