import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { sendInvite, registerAdmin } from "../api/adminApi";

export function AdminPanel() {
  const [admin, setAdmin] = useState({ adminId: "", name: "", email: "", contactNumber: "" });
  const [admins, setAdmins] = useState([]);

  const handleChange = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registered = await registerAdmin(admin);
    setAdmins((prev) => [...prev, registered]);
    setAdmin({ adminId: "", name: "", email: "", contactNumber: "" });
  };

  const handleSendInvite = async () => {
    if (admin.email) {
      const msg = await sendInvite(admin.email);
      alert(msg);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Admin Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Admin ID" name="adminId" value={admin.adminId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={admin.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" value={admin.email} onChange={handleChange} fullWidth type="email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contact Number" name="contactNumber" value={admin.contactNumber} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={handleSendInvite} fullWidth>Send Invite</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" fullWidth>Register Admin</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {admins.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} secondary={`ID: ${item.adminId} | Email: ${item.email}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
