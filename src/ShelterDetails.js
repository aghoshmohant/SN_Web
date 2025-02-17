import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import './style2.css';

const ShelterDetails = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCampId, setEditCampId] = useState(null);
  const [editPeopleOnly, setEditPeopleOnly] = useState(false);
  const [camps, setCamps] = useState([]);
  const [formData, setFormData] = useState({
    camp_name: '',
    current_people: '',
    max_capacity: '',
    city: '',
    district: '',
    map_link: '',
    contact_number: '',
  });

  // Fetch all camps from the API
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://192.168.215.52:5000/api/camps');
        setCamps(response.data.reverse());
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };
    fetchCamps();
  }, []);

  const openPopup = (camp = null, editPeopleOnlyMode = false) => {
    setEditPeopleOnly(editPeopleOnlyMode);
    if (camp) {
      setEditMode(true);
      setEditCampId(camp.id);
      setFormData(camp);
    } else {
      setEditMode(false);
      setFormData({
        camp_name: '',
        current_people: '',
        max_capacity: '',
        city: '',
        district: '',
        map_link: '',
        contact_number: '',
      });
    }
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && editPeopleOnly) {
        // Update only the current people count
        const response = await axios.put(`http://192.168.215.52:5000/api/camps/${editCampId}/people`, {
          current_people: formData.current_people,
        });
        if (response.status === 200) {
          const updatedCamp = response.data;
          setCamps(camps.map((camp) => (camp.id === editCampId ? updatedCamp : camp)));
          alert('Current people count successfully updated');
        }
      } else if (editMode) {
        // Update all fields
        const response = await axios.put(`http://192.168.215.52:5000/api/camps/${editCampId}`, formData);
        if (response.status === 200) {
          const updatedCamp = response.data;
          setCamps(camps.map((camp) => (camp.id === editCampId ? updatedCamp : camp)));
          alert('Successfully updated');
        }
      } else {
        // Add new camp
        const response = await axios.post('http://192.168.215.52:5000/api/camps', formData);
        if (response.status === 200 || response.status === 201) {
          const newCamp = response.data;
          setCamps([...camps, newCamp]);
          alert('Successfully submitted');
        }
      }
      closePopup();
    } catch (error) {
      alert(`Error submitting form: ${error.message}`);
      console.error('Error submitting form:', error);
    }
  };

  // Handle camp deletion with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this camp?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://192.168.215.52:5000/api/camps/${id}`);
      if (response.status === 200) {
        setCamps(camps.filter((camp) => camp.id !== id));
        alert('Successfully deleted');
      }
    } catch (error) {
      alert(`Error deleting camp: ${error.message}`);
      console.error('Error deleting camp:', error);
    }
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

        <button className="btn" onClick={() => openPopup()}>
          New
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Camp Name</th>
              <th>Current People</th>
              <th>Max Capacity</th>
              <th>City</th>
              <th>District</th>
              <th>Map Link</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp.id}>
                <td>{index + 1}</td>
                <td>{camp.camp_name}</td>
                <td>{camp.current_people}</td>
                <td>{camp.max_capacity}</td>
                <td>{camp.city}</td>
                <td>{camp.district}</td>
                <td>
                  <a href={camp.map_link} target="_blank" rel="noopener noreferrer" className='maplink'>
                    Map Link
                  </a>
                </td>
                <td>{camp.contact_number}</td>
                <td>
                  <button className="approve-btn" onClick={() => openPopup(camp, true)}>Edit</button>
                  <button className="reject-btn" onClick={() => handleDelete(camp.id)}>Delete</button>
                  
                </td>
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
              {!editPeopleOnly && (
                <>
                  <div>
                    <label htmlFor="camp_name" className="lab">
                      Camp Name
                    </label>
                    <input
                      type="text"
                      name="camp_name"
                      className="inp"
                      value={formData.camp_name}
                      onChange={handleChange}
                      required
                      disabled={editMode} // Disable camp name editing during edit mode
                    />
                  </div>
                  <div>
                    <label htmlFor="max_capacity" className="lab">
                      Max Capacity
                    </label>
                    <input
                      type="number"
                      name="max_capacity"
                      className="inp"
                      value={formData.max_capacity}
                      onChange={handleChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="lab">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="inp"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="district" className="lab">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      className="inp"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="map_link" className="lab">
                      Map Link
                    </label>
                    <input
                      type="text"
                      name="map_link"
                      className="inp"
                      value={formData.map_link}
                      onChange={handleChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact_number" className="lab">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="contact_number"
                      className="inp"
                      value={formData.contact_number}
                      onChange={handleChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="current_people" className="lab">
                  Current People
                </label>
                <input
                  type="number"
                  name="current_people"
                  className="inp"
                  value={formData.current_people}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button type="submit" className="submit">
                  {editMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDetails;
