import React, { useState, useEffect } from "react";
import {
  TextField, Button, List, ListItem, ListItemText,
  Typography, Box, Grid, Divider
} from "@mui/material";
import {
  sendInvite, registerAdmin, sendResult, getAllAdmins
} from "../api/adminApi";

export function AdminPanel() {
  const [admin, setAdmin] = useState({ adminId: "", name: "", email: "", contactNumber: "" });
  const [admins, setAdmins] = useState([]);
  const [inviteData, setInviteData] = useState({ email: "", testId: "" });
  const [inviteMessage, setInviteMessage] = useState("");
  const [resultData, setResultData] = useState({ studentId: "", testId: "" });
  const [resultMessage, setResultMessage] = useState("");

  // Fetch admins on mount
  useEffect(() => {
    async function loadAdmins() {
      const data = await getAllAdmins();
      setAdmins(data);
    }
    loadAdmins();
  }, []);

  // Admin Registration Handlers
  const handleAdminChange = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value });
  const handleRegister = async (e) => {
    e.preventDefault();
    const registered = await registerAdmin(admin);
    // re-fetch admins from backend for always-fresh list
    const updatedAdmins = await getAllAdmins();
    setAdmins(updatedAdmins);
    setAdmin({ adminId: "", name: "", email: "" , contactNumber: "" });
  };

  // Send Invite Handlers
  const handleInviteChange = (e) => setInviteData({ ...inviteData, [e.target.name]: e.target.value });
  const handleSendInvite = async () => {
    if (!inviteData.email || !inviteData.testId) {
      setInviteMessage("Please enter both Email and Test ID.");
      return;
    }
    const msg = await sendInvite(inviteData.email, Number(inviteData.testId));
    setInviteMessage(msg);
    setInviteData({ email: "", testId: "" });
  };

  // Send Result Handlers
  const handleResultChange = (e) => setResultData({ ...resultData, [e.target.name]: e.target.value });
  const handleSendResult = async () => {
    if (!resultData.studentId || !resultData.testId) {
      setResultMessage("Please enter both Student ID and Test ID.");
      return;
    }
    const msg = await sendResult(Number(resultData.studentId), Number(resultData.testId));
    setResultMessage(msg);
    setResultData({ studentId: "", testId: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Admin Panel</Typography>

      {/* Register Admin */}
      <Box component="form" onSubmit={handleRegister} noValidate sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Register New Admin</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Admin ID" name="adminId" value={admin.adminId} onChange={handleAdminChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Name" name="name" value={admin.name} onChange={handleAdminChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" name="email" value={admin.email} onChange={handleAdminChange} fullWidth type="email" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Contact Number" name="contactNumber" value={admin.contactNumber} onChange={handleAdminChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Register Admin
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Admin List */}
<Typography sx={{ color: '#4343e4ff' }} variant="h6" gutterBottom> Registered Admins </Typography>
      <List sx={{ mb: 4 }}>
        {admins.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography color="text.primary">
                  No registered admins.
                </Typography>
              }
            />
          </ListItem>
        ) : (
          admins.map((item) => (
            <ListItem key={item.id || item.adminId}>
              <ListItemText
                primary={
                  <Typography color="text.primary">{item.name}</Typography>
                }
                secondary={
                  <Typography color="text.secondary">
                   Email: {item.email}
                  </Typography>
                }
              />
            </ListItem>
          ))
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Send Invite */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Send Exam Invite</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={inviteData.email}
              onChange={handleInviteChange}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Test ID"
              name="testId"
              value={inviteData.testId}
              onChange={handleInviteChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" fullWidth onClick={handleSendInvite}>
              Send Invite
            </Button>
          </Grid>
        </Grid>
        {inviteMessage && <Typography color="primary" sx={{ mt: 2 }}>{inviteMessage}</Typography>}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Send Result */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Send Exam Result Email</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField label="Student ID" name="studentId" value={resultData.studentId} onChange={handleResultChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Test ID" name="testId" value={resultData.testId} onChange={handleResultChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" fullWidth onClick={handleSendResult}>
              Send Result
            </Button>
          </Grid>
        </Grid>
        {resultMessage && <Typography color="success.main" sx={{ mt: 2 }}>{resultMessage}</Typography>}
      </Box>
    </Box>
  );
}
