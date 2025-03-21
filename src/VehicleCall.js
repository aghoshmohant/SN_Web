import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import './style2.css';

const VehicleCall = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    district: '',
    count: '',
    vehicle_type: '',
    map_link: '',
    contact_number: '',
  });
  const [vehicleCalls, setVehicleCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch vehicle calls from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/call-vehicle')
      .then((response) => setVehicleCalls(response.data))
      .catch((err) => setError('Failed to fetch vehicle calls.'));
  }, []);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => {
    setPopupVisible(false);
    setFormData({
      location: '',
      district: '',
      count: '',
      vehicle_type: '',
      map_link: '',
      contact_number: '',
    });
    setError('');
    setSuccessMessage('');
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/call-vehicle', formData);
      setVehicleCalls([...vehicleCalls, response.data]);
      setSuccessMessage('Vehicle call registered successfully!');
      setFormData({
        location: '',
        district: '',
        count: '',
        vehicle_type: '',
        map_link: '',
        contact_number: '',
      });
    } catch (err) {
      setError('Failed to register vehicle call. Please try again.');
    } finally {
      setLoading(false);
      closePopup();
    }
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
        <h1 className="title">Call for Vehicles</h1>
        <button className="btn" onClick={openPopup}>New</button>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Location</th>
              <th>District</th>
              <th>Count</th>
              <th>Vehicle Type</th>
              <th>Map Link</th>
              <th>Contact No</th>
              <th>Remaining Vehicles</th> {/* Added new column */}
            </tr>
          </thead>
          <tbody>
            {vehicleCalls.map((call, index) => (
              <tr key={call.id}>
                <td>{index + 1}</td>
                <td>{call.location}</td>
                <td>{call.district}</td>
                <td>{call.count}</td>
                <td>{call.vehicle_type}</td>
                <td><a href={call.map_link} target="_blank" rel="noreferrer">Map</a></td>
                <td>{call.contact_number}</td>
                <td>{call.remaining_vehicles}</td> {/* Added new column data */}
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
                <label htmlFor="vehicle_type" className="lab">Vehicle Type</label>
                <select
                  name="vehicle_type"
                  className="inp"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Ambulance">Ambulance</option>
                  <option value="Fire Truck">Fire Truck</option>
                  <option value="Rescue Vehicle">Rescue Vehicle</option>
                  <option value="Utility Truck">Utility Truck</option>
                  <option value="Water Tanker">Water Tanker</option>
                  <option value="4x4 Off-road Vehicle">4x4 Off-road Vehicle</option>
                  <option value="Logistics Vehicle">Logistics Vehicle</option>
                  <option value="Command Vehicle">Command Vehicle</option>
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

export default VehicleCall;