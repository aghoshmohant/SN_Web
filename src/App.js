import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import VolunteerVerification from "./VolunteerVerification";
import OrganizationVerification from "./OrganizationVerification";
import DisasterVerification from "./DisasterVerification";
import VolunteerCall from "./VolunteerCall"; // Import the new VolunteerCall component
import VehicleCall from "./VehicleCall"; // Import the new VehicleCall component
import ShelterDetails from './ShelterDetails';
import RequirementItems from './RequirementItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volunteer-verification" element={<VolunteerVerification />} />
        <Route path="/organization-verification" element={<OrganizationVerification />} />
        <Route path="/disaster-verification" element={<DisasterVerification />} />
        <Route path="/call-volunteer" element={<VolunteerCall />} /> 
        <Route path="/call-vehicle" element={<VehicleCall />} /> 
        <Route path="/shelter-details" element={<ShelterDetails />} />
        <Route path="/requirement-items" element={<RequirementItems />} />
      </Routes>
    </Router>
  );
}

export default App;
