import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import './style2.css';

const BloodBanks = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    number: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    district: '',
    number: '',
  });

  // Fetch blood banks on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    } else {
      fetchBloodBanks();
    }
  }, [navigate]);

  const fetchBloodBanks = async () => {
    try {
      const response = await axios.get('http://192.168.215.52:5000/api/blood-banks');
      setBloodBanks(response.data.reverse());
    } catch (error) {
      console.error('Error fetching blood banks:', error);
    }
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const openEditPopup = (bloodBank) => {
    setEditFormData({
      id: bloodBank.id,
      name: bloodBank.name,
      district: bloodBank.district,
      number: bloodBank.number,
    });
    setEditPopupVisible(true);
  };
  const closeEditPopup = () => setEditPopupVisible(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.215.52:5000/api/blood-banks', formData);
      alert('Blood bank added successfully!');
      fetchBloodBanks(); // Refresh the table
      closePopup(); // Close popup after submission
    } catch (error) {
      console.error('Error adding blood bank:', error);
      alert('Failed to add blood bank.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.215.52:5000/api/blood-banks/${editFormData.id}`, editFormData);
      alert('Blood bank updated successfully!');
      fetchBloodBanks(); // Refresh the table
      closeEditPopup(); // Close edit popup after submission
    } catch (error) {
      console.error('Error updating blood bank:', error);
      alert('Failed to update blood bank.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood bank?')) {
      try {
        await axios.delete(`http://192.168.215.52:5000/api/blood-banks/${id}`);
        alert('Blood bank deleted successfully!');
        fetchBloodBanks(); // Refresh the table after deletion
      } catch (error) {
        console.error('Error deleting blood bank:', error);
        alert('Failed to delete blood bank.');
      }
    }
  };

  return (
    <div>
      <div className="nav">
        <Link to="/home">
          <div className="back">
            <img src="assets/icons/back-button.png" alt="home" className="back-icon" />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Blood Banks</h1>
        <button className="btn" onClick={openPopup}>New</button>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>District</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bloodBanks.map((bloodBank, index) => (
              <tr key={bloodBank.id}>
                <td>{index + 1}</td>
                <td>{bloodBank.name}</td>
                <td>{bloodBank.district}</td>
                <td>{bloodBank.number}</td>
                <td>
                  <button className="approve-btn" onClick={() => openEditPopup(bloodBank)}>Edit</button>
                  <button className="reject-btn" onClick={() => handleDelete(bloodBank.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupVisible && (
        <div className="body1" style={{ display: 'flex' }}>
          <div className="box">
            <img src="./assets/icons/close.png" alt="Close" className="close" onClick={closePopup} />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="lab">Name</label>
                <input type="text" name="name" className="inp" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="district" className="lab">District</label>
                <input type="text" name="district" className="inp" value={formData.district} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="number" className="lab">Contact Number</label>
                <input type="text" name="number" className="inp" value={formData.number} onChange={handleInputChange} required />
              </div>
              <button type="submit" className="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {editPopupVisible && (
        <div className="body1" style={{ display: 'flex' }}>
          <div className="box">
            <img src="./assets/icons/close.png" alt="Close" className="close" onClick={closeEditPopup} />
            <form onSubmit={handleEditSubmit}>
              <div>
                <label htmlFor="name" className="lab">Name</label>
                <input
                  type="text"
                  name="name"
                  className="inp"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="district" className="lab">District</label>
                <input
                  type="text"
                  name="district"
                  className="inp"
                  value={editFormData.district}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="lab">Contact Number</label>
                <input
                  type="text"
                  name="number"
                  className="inp"
                  value={editFormData.number}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <button type="submit" className="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBanks;