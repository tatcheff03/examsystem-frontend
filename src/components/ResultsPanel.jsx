import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { getResult } from "../api/resultsApi";

export function ResultsPanel() {
  const [resultQuery, setResultQuery] = useState({ studentId: "", testId: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setResultQuery({ ...resultQuery, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetched = await getResult(resultQuery.studentId, resultQuery.testId);
    setResult(fetched);
    setResultQuery({ studentId: "", testId: "" });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Results Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Student ID"
              name="studentId"
              value={resultQuery.studentId}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Test ID"
              name="testId"
              value={resultQuery.testId}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Get Result</Button>
          </Grid>
        </Grid>
      </Box>
      {result && (
        <List sx={{ mt: 3 }}>
          <ListItem divider>
            <ListItemText
              primary={
                <Typography sx={{ color: '#1565c0', fontWeight: 500 }}>
                  {`Student:`}&nbsp;{result.studentName} - Grade: {result.grade}
                </Typography>
              }
              secondary={
                <Typography sx={{ color: 'text.secondary' }}>
                  {`Marks: ${result.marks} | Test ID: ${result.testId}`}
                </Typography>
              }
            />
          </ListItem>
        </List>
      )}
    </Box>
  );
}
