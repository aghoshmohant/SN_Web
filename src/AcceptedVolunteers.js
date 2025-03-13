import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import './style2.css';

const AcceptedVolunteers = () => {
  const navigate = useNavigate();
  const [acceptedVolunteers, setAcceptedVolunteers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    } else {
      fetchAcceptedVolunteers();
    }
  }, [navigate]);

  const fetchAcceptedVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/accepted-volunteers');
      setAcceptedVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching accepted volunteers:', error);
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
        <h1 className="title">Accepted Volunteers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Call ID</th>
              <th>Volunteer ID</th>
            </tr>
          </thead>
          <tbody>
            {acceptedVolunteers.map((volunteer, index) => (
              <tr key={volunteer.id}>
                <td>{index + 1}</td>
                <td>{volunteer.full_name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone_number}</td>
                <td>{volunteer.role}</td>
                <td>{volunteer.call_id}</td>
                <td>{volunteer.volunteer_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedVolunteers;
