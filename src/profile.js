import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const AuthorityProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    designation: "Senior Manager",
    department: "Technology",
    employeeId: "EMP12345",
    district: "New York",
    officeAddress: "123 Main St, Anytown",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const handlePasswordReset = () => {
    if (password === confirmPassword) {
      setSnackbarMessage("Password reset successful!");
      setSnackbarSeverity("success");
      setPassword("");
      setConfirmPassword("");
    } else {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setSnackbarMessage("Edit mode enabled.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    setSnackbarMessage("Profile updated successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#2E7D32" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "white", flexGrow: 1 }}
          >
            Authority Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Profile Form Container */}
      <Container
        component="main"
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#E8F5E9",
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            p: 4,
            border: "1px solid #66BB6A",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          {/* Profile Heading */}
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1B5E20" }}
          >
            Profile Information
          </Typography>

          {/* Profile Details */}
          <Grid container spacing={2}>
            {Object.entries(profileData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  label={key
                    .charAt(0)
                    .toUpperCase()
                    .concat(key.slice(1).replace(/([A-Z])/g, " $1"))}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          {/* Reset Password Section */}
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ mt: 4, fontWeight: "bold", color: "#1B5E20" }}
          >
            Reset Password
          </Typography>

          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {/* Buttons */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handlePasswordReset}
              sx={{
                mr: 2,
                backgroundColor: "#388E3C",
                "&:hover": { backgroundColor: "#2E7D32" },
              }}
            >
              Reset Password
            </Button>

            <Button
              variant={editMode ? "contained" : "outlined"}
              onClick={handleEditToggle}
              sx={{
                mr: 2,
                color: editMode ? "white" : "#388E3C",
                backgroundColor: editMode ? "#388E3C" : "transparent",
                borderColor: "#388E3C",
                "&:hover": {
                  backgroundColor: editMode ? "#2E7D32" : "#A5D6A7",
                },
              }}
            >
              {editMode ? "Cancel Edit" : "Edit Profile"}
            </Button>

            {editMode && (
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#145A32" },
                }}
              >
                Save Changes
              </Button>
            )}
          </Box>
        </Box>
      </Container>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthorityProfile;
