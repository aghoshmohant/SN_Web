import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const OrganizationVerification = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch only unverified organizations
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://192.168.215.52:5000/api/organization?verified=false');
      setOrganizations(response.data.reverse());
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch organizations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm('Are you sure you want to approve this organization?')) {
      try {
        await axios.put(`http://192.168.215.52:5000/api/organization/approve/${id}`);
        setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
        alert('Organization approved successfully.');
      } catch (error) {
        alert('Failed to approve organization.');
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject this organization?')) {
      try {
        await axios.delete(`http://192.168.215.52:5000/api/organization/reject/${id}`);
        setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
        alert('Organization rejected successfully.');
      } catch (error) {
        alert('Failed to reject organization.');
      }
    }
  };

  return (
    <div>
      <div className="nav">
        <Link to="/home">
          <div className="back">
            <img src="assets/icons/back-button.png" alt="Back to Home" className="back-icon" />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Organizations List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : organizations.length === 0 ? (
          <p>No unverified organizations found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Organization Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Social Media Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org, index) => (
                <tr key={org.id}>
                  <td>{index + 1}</td>
                  <td>{org.org_name}</td>
                  <td>{org.email}</td>
                  <td>{org.phone_number}</td>
                  <td>{org.district}</td>
                  <td>
                    {org.social_media_link ? (
                      <a href={org.social_media_link} target="_blank" rel="noopener noreferrer">
                        {org.social_media_link}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleApprove(org.id)} className="approve-btn">Approve</button>
                    <button onClick={() => handleReject(org.id)} className="reject-btn">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrganizationVerification;
