// src/components/TestPanel.jsx
import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { useTestsApi } from "../api/testApi"; 

export default function TestPanel() {
  const { addTest } = useTestsApi(); 
  const [test, setTest] = useState({
    testId: "",
    examinerId: "",
    name: "",
    duration: "",
    startTime: "",
    numberOfQuestions: ""
  });
  const [tests, setTests] = useState([]);

  const handleChange = (e) => setTest({ ...test, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const savedTest = await addTest(test); 
      setTests((prev) => [...prev, savedTest]);
      setTest({ testId: "", examinerId: "", name: "", duration: "", startTime: "", numberOfQuestions: "" });
    } catch (err) {
      alert("Failed to add test. Please check the API connection.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Test Panel</Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Test ID"
              name="testId"
              value={test.testId}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Examiner ID"
              name="examinerId"
              value={test.examinerId}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={test.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration (hours)"
              name="duration"
              value={test.duration}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Time (HH:mm)"
              name="startTime"
              value={test.startTime}
              onChange={handleChange}
              fullWidth
              placeholder="14:30"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Questions"
              name="numberOfQuestions"
              value={test.numberOfQuestions}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Test</Button>
          </Grid>
        </Grid>
      </Box>

      <List sx={{ mt: 3 }}>
        {tests.map((item, index) => (
          <ListItem key={item.id || index} divider>
            <ListItemText
              primary={item.name}
              secondary={`Examiner ID: ${item.examinerId} | Duration: ${item.duration}h | Questions: ${item.numberOfQuestions}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
