import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import apiLink from "../../data/ApiLink";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UserCreationForm({ open, handleClose, onUserCreated }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    // Input Validation
    if (!userName || userName.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
       await axios.post(
        `${apiLink}/admin/users`,
        { userName, password, email, isAdmin },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Pass the newly created user back to the parent
      onUserCreated({ user_name:userName, email, isAdmin }); 
      handleClose(); 
    } catch (error) {
      setError("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ p: 5 }}>
      <DialogTitle sx={{ color: "black" }}>Create New User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={error?.includes("email")} 
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                sx={{ color: "black" }}
              />
            }
            label="Is Admin"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleCreateUser} color="success" variant="outlined" disabled={loading}>
          {loading ? (
            <>
              Creating... <CircularProgress color="inherit" size={20} />
            </>
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserCreationForm;
