import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { addTest } from "../api/testApi";

export function TestPanel() {
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
    const saved = await addTest(test);
    setTests((prev) => [...prev, saved]);
    setTest({ testId: "", examinerId: "", name: "", duration: "", startTime: "", numberOfQuestions: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Test Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Test ID" name="testId" value={test.testId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Examiner ID" name="examinerId" value={test.examinerId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={test.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Duration (hours)" name="duration" value={test.duration} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Start Time (HH:mm)" name="startTime" value={test.startTime} onChange={handleChange} fullWidth placeholder="14:30" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Number of Questions" name="numberOfQuestions" value={test.numberOfQuestions} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Test</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {tests.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} secondary={`Examiner ID: ${item.examinerId} | Duration: ${item.duration}h`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
