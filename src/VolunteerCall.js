import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import './style2.css';

const VolunteerCall = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    district: '',
    count: '',
    role: '',
    map_link: '',
    contact_number: '',
  });
  const [volunteerCall, setVolunteerCall] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch volunteer calls from the backend
  useEffect(() => {
    axios.get('http://192.168.215.52:5000/api/call-volunteer')
      .then((response) => setVolunteerCall(response.data))
      .catch((err) => console.error(err));
  }, []);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    axios.post('http://192.168.215.52:5000/api/call-volunteer', formData)
      .then((response) => {
        setVolunteerCall([...volunteerCall, response.data]); // Add new call

        alert('Volunteer call created and data updated successfully!');

        // Reset the form
        setFormData({
          location: '',
          district: '',
          count: '',
          role: '',
          map_link: '',
          contact_number: '',
        });

        closePopup(); // Close popup
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to create volunteer call. Please try again.');
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  return (
    <div>
      <div className="nav">
        <Link to="/home">
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
        <h1 className="title">Call for Volunteer</h1>
        <button className="btn" onClick={openPopup}>New</button>
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Location</th>
              <th>District</th>
              <th>Count</th>
              <th>Role</th>
              <th>Map Link</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {volunteerCall.map((call, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{call.location}</td>
                <td>{call.district}</td>
                <td>{call.count}</td>
                <td>{call.role}</td>
                <td><a href={call.map_link} target="_blank" rel="noreferrer">Map</a></td>
                <td>{call.contact_number}</td>
              </tr>
            ))}
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
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="location" className="lab">Location</label>
                <input type="text" name="location" className="inp" value={formData.location} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="district" className="lab">District</label>
                <input type="text" name="district" className="inp" value={formData.district} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="count" className="lab">Count</label>
                <input type="number" name="count" className="inp" value={formData.count} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="role" className="lab">Role</label>
                <select
                  name="role"
                  className="inp"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select a role</option>
                  <option value="First Responder">First Responder</option>
                  <option value="Medical Volunteer">Medical Volunteer</option>
                  <option value="Logistics Volunteer">Logistics Volunteer</option>
                  <option value="Search and Rescue">Search and Rescue</option>
                  <option value="Counseling Volunteer">Counseling Volunteer</option>
                </select>
              </div>
              <div>
                <label htmlFor="map_link" className="lab">Map Link</label>
                <input type="text" name="map_link" className="inp" value={formData.map_link} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="contact_number" className="lab">Contact Number</label>
                <input type="text" name="contact_number" className="inp" value={formData.contact_number} onChange={handleChange} />
              </div>
              <button type="submit" className="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerCall;
