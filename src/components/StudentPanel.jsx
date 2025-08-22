import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { registerStudent } from "../api/studentApi";

export function StudentPanel() {
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    address: "",
    contactNumber: "",
    email: ""
  });
  const [students, setStudents] = useState([]);

  const handleChange = (e) => setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registered = await registerStudent(student);
    setStudents((prev) => [...prev, registered]);
    setStudent({ studentId: "", name: "", address: "", contactNumber: "", email: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Student Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Student ID" name="studentId" value={student.studentId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={student.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Address" name="address" value={student.address} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contact Number" name="contactNumber" value={student.contactNumber} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" value={student.email} onChange={handleChange} fullWidth type="email" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Student</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {students.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} secondary={`Email: ${item.email} | ID: ${item.studentId}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
