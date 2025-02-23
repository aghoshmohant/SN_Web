import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import './style2.css';

const RequirementItems = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    item_name: '',
    quantity: '',
    category: '',
    camp_name: '',
    city: '',
    district: '',
    map_link: '',
    phone_number: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    quantity: ''
  });

  // Fetch requirements on component mount
  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get('http://192.168.215.52:5000/api/requirements');
      setRequirements(response.data.reverse());
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const openEditPopup = (item) => {
    setEditFormData({
      id: item.id,
      quantity: item.quantity
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
      await axios.post('http://192.168.215.52:5000/api/requirements', formData);
      alert('Requirement item created successfully!');
      fetchRequirements(); // Refresh the table
      closePopup(); // Close popup after submission
    } catch (error) {
      console.error('Error adding requirement:', error);
      alert('Failed to create requirement item.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.215.52:5000/api/requirements/${editFormData.id}`, {
        quantity: editFormData.quantity
      });
      alert('Quantity updated successfully!');
      fetchRequirements(); // Refresh the table
      closeEditPopup(); // Close edit popup after submission
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://192.168.215.52:5000/api/requirements/${id}`);
        alert('Requirement item deleted successfully!');
        fetchRequirements(); // Refresh the table after deletion
      } catch (error) {
        console.error('Error deleting requirement:', error);
        alert('Failed to delete requirement item.');
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
        <h1 className="title">Requirement Items</h1>
        <button className="btn" onClick={openPopup}>New</button>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Camp Name</th>
              <th>City</th>
              <th>District</th>
              <th>Map Link</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{item.camp_name}</td>
                <td>{item.city}</td>
                <td>{item.district}</td>
                <td>
                  <a href={item.map_link} target="_blank" rel="noopener noreferrer" className='maplink'>
                    Map Link
                  </a>
                </td>
                <td>{item.phone_number}</td>
                <td>
                <button className="approve-btn" onClick={() => openEditPopup(item)}>Edit Quantity</button>
                  <button className="reject-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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
                <label htmlFor="item_name" className="lab">Item Name</label>
                <input type="text" name="item_name" className="inp" value={formData.item_name} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="quantity" className="lab">Quantity</label>
                <input type="number" name="quantity" className="inp" value={formData.quantity} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="category" className="lab">Category</label>
                <select name="category" className="inp" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Water">Water</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Shelter">Shelter</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label htmlFor="camp_name" className="lab">Camp Name</label>
                <input type="text" name="camp_name" className="inp" value={formData.camp_name} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="city" className="lab">City</label>
                <input type="text" name="city" className="inp" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="district" className="lab">District</label>
                <select name="district" className="inp" value={formData.district} onChange={handleInputChange} required>
                  <option value="">Select District</option>
                  <option value="Alappuzha">Alappuzha</option>
                  <option value="Ernakulam">Ernakulam</option>
                  <option value="Idukki">Idukki</option>
                  {/* Add other districts here */}
                </select>
              </div>
              <div>
                <label htmlFor="map_link" className="lab">Map Link</label>
                <div className="map-input-wrapper" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="map_link"
                    className="inp"
                    value={formData.map_link}
                    onChange={handleInputChange}
                    placeholder="Paste the selected location URL here"
                    required
                  />
                  <img
                    src="assets/icons/google-maps.png"
                    alt="Google Maps"
                    className="map-icon"
                    onClick={() => window.open(formData.map_link || 'https://www.google.com/maps', '_blank')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone_number" className="lab">Phone Number</label>
                <input type="text" name="phone_number" className="inp" value={formData.phone_number} onChange={handleInputChange} required />
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
                <label htmlFor="quantity" className="lab">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="inp"
                  value={editFormData.quantity}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <button type="submit" className="submit">Update Quantity</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementItems;
