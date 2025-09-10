import React, { useState, useEffect } from "react";
import {
  TextField, Button, List, ListItem, ListItemText,
  Typography, Box, Divider, Grid
} from "@mui/material";
import { useAdminApi } from "../api/adminApi";

export default function AdminPanel() {
  const { sendInvite, registerAdmin, sendResult, getAllAdmins } = useAdminApi();

  const [admin, setAdmin] = useState({ adminId: "", name: "", email: "", contactNumber: "" });
  const [admins, setAdmins] = useState([]);
  const [inviteData, setInviteData] = useState({ email: "", testId: "" });
  const [inviteMessage, setInviteMessage] = useState("");
  const [resultData, setResultData] = useState({ studentId: "", testId: "" });
  const [resultMessage, setResultMessage] = useState("");

  // Fetch admins once on mount
  useEffect(() => {
    async function loadAdmins() {
      try {
        const data = await getAllAdmins();
        setAdmins(data);
      } catch (err) {
        console.error("Failed to load admins:", err);
      }
    }
    loadAdmins();
  }, []); // ✅ empty dependency → fetch only once

  const handleAdminChange = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(admin);
      const updatedAdmins = await getAllAdmins();
      setAdmins(updatedAdmins);
      setAdmin({ adminId: "", name: "", email: "", contactNumber: "" });
    } catch (err) {
      console.error("Failed to register admin:", err);
    }
  };

  const handleInviteChange = (e) => setInviteData({ ...inviteData, [e.target.name]: e.target.value });
  const handleSendInvite = async () => {
    if (!inviteData.email || !inviteData.testId) {
      setInviteMessage("Please enter both Email and Test ID.");
      return;
    }
    try {
      const msg = await sendInvite(inviteData.email, Number(inviteData.testId));
      setInviteMessage(msg);
      setInviteData({ email: "", testId: "" });
    } catch (err) {
      setInviteMessage("Failed to send invite.");
      console.error(err);
    }
  };

  const handleResultChange = (e) => setResultData({ ...resultData, [e.target.name]: e.target.value });
  const handleSendResult = async () => {
    if (!resultData.studentId || !resultData.testId) {
      setResultMessage("Please enter both Student ID and Test ID.");
      return;
    }
    try {
      const msg = await sendResult(Number(resultData.studentId), Number(resultData.testId));
      setResultMessage(msg);
      setResultData({ studentId: "", testId: "" });
    } catch (err) {
      setResultMessage("Failed to send result.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
        Admin Panel
      </Typography>

      {/* Register Admin */}
      <Box component="form" onSubmit={handleRegister} noValidate sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>
          Register New Admin
        </Typography>
        <Grid container spacing={2}>
          <Grid sx={{ flex: 1, minWidth: 0.5 }}>
            <TextField label="Admin ID" name="adminId" value={admin.adminId} onChange={handleAdminChange} fullWidth type="number" />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 0.5 }}>
            <TextField label="Name" name="name" value={admin.name} onChange={handleAdminChange} fullWidth />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 0.5 }}>
            <TextField label="Email" name="email" value={admin.email} onChange={handleAdminChange} fullWidth type="email" />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 0.5 }}>
            <TextField label="Contact Number" name="contactNumber" value={admin.contactNumber} onChange={handleAdminChange} fullWidth />
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <Button type="submit" variant="contained" fullWidth>Register Admin</Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Admin List */}
      <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>Registered Admins</Typography>
      <List sx={{ mb: 4 }}>
        {admins.length === 0 ? (
          <ListItem>
            <ListItemText primary="No registered admins." primaryTypographyProps={{ color: 'text.primary', fontWeight: 500 }} />
          </ListItem>
        ) : (
          admins.map((item) => (
            <ListItem key={item.id || item.adminId}>
              <ListItemText
                primary={item.name}
                secondary={`Email: ${item.email}`}
                primaryTypographyProps={{ color: 'text.primary', fontWeight: 600 }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
            </ListItem>
          ))
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Send Invite */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>Send Exam Invite</Typography>
        <Grid container spacing={2}>
          <Grid sx={{ flex: 1, minWidth: '45%' }}>
            <TextField label="Email" name="email" value={inviteData.email} onChange={handleInviteChange} fullWidth type="email" />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: '45%' }}>
            <TextField label="Test ID" name="testId" value={inviteData.testId} onChange={handleInviteChange} fullWidth type="number" />
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <Button variant="contained" fullWidth onClick={handleSendInvite}>Send Invite</Button>
          </Grid>
        </Grid>
        {inviteMessage && <Typography color="success.main" sx={{ mt: 2 }}>{inviteMessage}</Typography>}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Send Result */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "secondary.main" }}>Send Exam Result Email</Typography>
        <Grid container spacing={2}>
          <Grid sx={{ flex: 1, minWidth: '45%' }}>
            <TextField label="Student ID" name="studentId" value={resultData.studentId} onChange={handleResultChange} fullWidth type="number" />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: '45%' }}>
            <TextField label="Test ID" name="testId" value={resultData.testId} onChange={handleResultChange} fullWidth type="number" />
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <Button variant="contained" fullWidth onClick={handleSendResult}>Send Result</Button>
          </Grid>
        </Grid>
        {resultMessage && <Typography color="success.main" sx={{ mt: 2 }}>{resultMessage}</Typography>}
      </Box>
    </Box>
  );
}
