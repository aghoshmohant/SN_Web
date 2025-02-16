import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import './style2.css';

const RequirementItems = () => {
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
        <h1 className="title">Requirement Items</h1>

        <button className="btn" onClick={openPopup}>
          New
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Location</th>
              <th>District</th>
              <th>Item Name</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SafeNet</td>
              <td>aghoshmohant@gmail.com</td>
              <td>8590650812</td>
              <td></td>
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
                Item Name
              </label>
              <input type="text" name="category" className="inp" />
            </div>
            <div>
              <label htmlFor="count" className="lab">
                Count
              </label>
              <input type="number" name="count" className="inp" />
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

export default RequirementItems;
