import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import './style2.css';

const Contacts = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    number: '',
  });

  // Fetch contacts on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    } else {
      fetchContacts();
    }
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://192.168.215.52:5000/api/contacts');
      setContacts(response.data.reverse());
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const openEditPopup = (contact) => {
    setEditFormData({
      id: contact.id,
      name: contact.name,
      number: contact.number,
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
      await axios.post('http://192.168.215.52:5000/api/contacts', formData);
      alert('Contact added successfully!');
      fetchContacts(); // Refresh the table
      closePopup(); // Close popup after submission
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.215.52:5000/api/contacts/${editFormData.id}`, {
        name: editFormData.name,
        number: editFormData.number,
      });
      alert('Contact updated successfully!');
      fetchContacts(); // Refresh the table
      closeEditPopup(); // Close edit popup after submission
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://192.168.215.52:5000/api/contacts/${id}`);
        alert('Contact deleted successfully!');
        fetchContacts(); // Refresh the table after deletion
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact.');
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
        <h1 className="title">Emergency Contacts</h1>
        <button className="btn" onClick={openPopup}>New</button>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.number}</td>
                <td>
                  <button className="approve-btn" onClick={() => openEditPopup(contact)}>Edit</button>
                  <button className="reject-btn" onClick={() => handleDelete(contact.id)}>Delete</button>
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
                <label htmlFor="number" className="lab">Phone Number</label>
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
                <label htmlFor="number" className="lab">Phone Number</label>
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

export default Contacts;