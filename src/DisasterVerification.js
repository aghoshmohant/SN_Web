import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const DisasterVerification = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for modal image

  // Function to fetch disaster data
  const fetchDisasters = async () => {
    try {
      const response = await axios.get("http://192.168.215.52:5000/api/disaster");
      setDisasters(response.data.reverse());
      setLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  // Function to handle button click to show the image in a modal
  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="nav">
        <Link to="/">
          <div className="back">
            <img src="assets/icons/back-button.png" alt="Back to Home" className="back-icon" />
          </div>
        </Link>
        <div>
          <img src="assets/images/SafeNet.png" alt="logo" className="logo" />
        </div>
      </div>

      <div className="main">
        <h1 className="title">Disaster Verification</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : disasters.length === 0 ? (
          <p>No disasters available for verification.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Disaster Type</th>
                <th>Affected Area</th>
                <th>District</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {disasters.map((disaster, index) => (
                <tr key={disaster.id}>
                  <td>{index + 1}</td>
                  <td>{disaster.disaster_type}</td>
                  <td>{disaster.affected_area}</td>
                  <td>{disaster.district}</td>
                  <td>{new Date(disaster.dob).toLocaleDateString()}</td>
                  <td>
                    {disaster.image ? (
                      <button
                        className="view-image-btn"
                        onClick={() => handleViewImage(disaster.image)} // Show image when button is clicked
                      >
                        View Image
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

        {/* Modal for showing the image */}
        {selectedImage && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
              <img src={selectedImage} alt="Disaster" className="modal-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterVerification;
