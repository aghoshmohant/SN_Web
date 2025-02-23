import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    designation: "",
    department: "",
    employee_id: "",
    district: "",
    office_address: "",
    password: "",
    confirm_password: "",
    id_proof: null,
    photo: null,
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      return;
    }

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/api/head-register/register",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "District head registered successfully!") {
        setMessage("Successfully registered! Redirecting to login page...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("Registration successful! Redirecting to login page...");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || "An error occurred during registration"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container-unique">
      <h1 className="registration-title-unique">Register</h1>
      <form onSubmit={handleSubmit} className="registration-form-unique">
        {[
          { label: "Full Name", type: "text", name: "full_name" },
          { label: "Email", type: "email", name: "email" },
          { label: "Phone Number", type: "tel", name: "phone_number" },
          { label: "Designation", type: "text", name: "designation" },
          { label: "Department", type: "text", name: "department" },
          { label: "Employee ID", type: "text", name: "employee_id" },
          { label: "District", type: "text", name: "district" },
          { label: "Office Address", type: "text", name: "office_address" },
          { label: "Password", type: "password", name: "password" },
          { label: "Confirm Password", type: "password", name: "confirm_password" },
        ].map((field) => (
          <div className="form-group-unique" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="form-group-unique">
          <label htmlFor="id_proof">ID Proof</label>
          <input
            type="file"
            id="id_proof"
            name="id_proof"
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .pdf"
            required
          />
        </div>

        <div className="form-group-unique">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg"
            required
          />
        </div>

        <button type="submit" className="register-button-unique" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Submitting...
              <div className="spinner-unique"></div>
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
      {message && <p className="message-unique">{message}</p>}
    </div>
  );
};

export default Registration;
