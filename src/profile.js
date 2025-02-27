import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const HeadProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordData, setPasswordData] = useState({ old_password: "", new_password: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/headProfileRoute/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setOriginalProfile(response.data); // Save original profile
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(
        "http://localhost:5000/api/headProfileRoute/profile",
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOriginalProfile(profile); // Update original profile after saving
    setIsEditMode(false);
    alert("Profile updated successfully!")
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      await axios.put(
        "http://localhost:5000/api/headProfileRoute/change-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed successfully");
      setPasswordData({ old_password: "", new_password: "" });
    } catch (err) {
      setError("Failed to change password: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("districtHeadId");
    navigate("/");
  };

  if (loading) return <p className="profile-loading">Loading...</p>;

  return (
    <div className="head-profile-wrapper">
      <div className="head-profile-nav">
        <button onClick={() => navigate("/home")} className="head-profile-back-btn">&larr; Back</button>
      </div>

      <h1 className="head-profile-title">Profile</h1>
      {error && <p className="head-profile-error">{error}</p>}

      <form onSubmit={handleProfileSubmit} className="head-profile-edit-form">
        <div className="head-profile-field">
          <label className="head-profile-label">Email</label>
          <input type="email" value={profile.email || ""} readOnly className="head-profile-input head-profile-readonly" placeholder="Email" />
        </div>

        {isEditMode ? (
          <>
            {['full_name', 'phone_number', 'district', 'designation', 'department', 'employee_id', 'office_address'].map(field => (
              <div className="head-profile-field" key={field}>
                <label className="head-profile-label">{field.replace('_', ' ')}</label>
                <input type="text" name={field} value={profile[field] || ""} onChange={handleInputChange} className="head-profile-input" />
              </div>
            ))}
          </>
        ) : (
          <>
            {['full_name', 'phone_number', 'district', 'designation', 'department', 'employee_id', 'office_address'].map(field => (
              <div className="head-profile-field" key={field}>
                <label className="head-profile-label">{field.replace('_', ' ')}</label>
                <p>{profile[field] || "N/A"}</p>
              </div>
            ))}
          </>
        )}

        <button
          type="button"
          onClick={() => {
            if (isEditMode) {
              setProfile(originalProfile); // Reset fields to original values
            }
            setIsEditMode((prev) => !prev);
          }}
          className="head-profile-edit-btn"
        >
          {isEditMode ? "Cancel Edit" : "Edit Profile"}
        </button>

        {isEditMode && (
          <button type="submit" className="head-profile-update-btn">
            Update Data
          </button>
        )}
      </form>

      <h2 className="head-profile-password-title">Change Password</h2>
      <form onSubmit={handlePasswordSubmit} className="head-profile-password-form">
        <div className="head-profile-password-field">
          <label className="head-profile-password-label">Old Password</label>
          <input type="password" name="old_password" value={passwordData.old_password} onChange={handlePasswordChange} className="head-profile-password-input" required />
        </div>
        <div className="head-profile-password-field">
          <label className="head-profile-password-label">New Password</label>
          <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} className="head-profile-password-input" required />
        </div>
        <button type="submit" className="head-profile-password-btn">Change Password</button>
      </form>

      <button onClick={handleLogout} className="head-profile-logout-btn">Logout</button>
    </div>
  );
};

export default HeadProfile;
