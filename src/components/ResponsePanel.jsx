import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { addResponse } from "../api/responseApi";

export function ResponsePanel() {
  const [response, setResponse] = useState({
    studentId: "",
    questionId: "",
    testId: "",
    selectedChoice: ""
  });
  const [responses, setResponses] = useState([]);

  const handleChange = (e) => setResponse({ ...response, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await addResponse(response);
    setResponses((prev) => [...prev, saved]);
    setResponse({ studentId: "", questionId: "", testId: "", selectedChoice: "" });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Response Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Student ID" name="studentId" value={response.studentId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Question ID" name="questionId" value={response.questionId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Test ID" name="testId" value={response.testId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Selected Choice" name="selectedChoice" value={response.selectedChoice} onChange={handleChange} fullWidth inputProps={{ maxLength: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Response</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {responses.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={`Student ${item.studentId}, Question ${item.questionId}`} secondary={`Test ${item.testId} - Selected: ${item.selectedChoice}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
