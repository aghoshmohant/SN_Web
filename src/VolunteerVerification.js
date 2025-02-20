import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const VolunteerVerification = () => {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("http://192.168.215.52:5000/api/volunteer/list");
      setVolunteers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="nav">
        <div className="back" onClick={handleBackClick} style={{ cursor: "pointer" }}>
          <img src="assets/icons/back-button.png" alt="back" className="back-icon" />
        </div>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Volunteer Verification</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : volunteers.length === 0 ? (
          <p>No volunteers available for verification.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Role</th>
                <th>Certificate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer, index) => (
                <tr key={volunteer.id}>
                  <td>{index + 1}</td>
                  <td>{volunteer.full_name}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.phone_number}</td>
                  <td>{volunteer.blood_group}</td>
                  <td>{volunteer.district}</td>
                  <td>{volunteer.role}</td>
                  <td>
                    {volunteer.certificate ? (
                      <button
                        className="view-certificate-btn"
                        onClick={() => handleViewImage(volunteer.certificate)}
                      >
                        View Certificate
                      </button>
                    ) : (
                      "Not Available"
                    )}
                  </td>
                  <td>
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedImage && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
              <img src={selectedImage} alt="Certificate" className="modal-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerVerification;
