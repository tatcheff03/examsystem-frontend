import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { registerExaminer } from "../api/examinerApi";

export function ExaminerPanel() {
  const [examiner, setExaminer] = useState({ examinerId: "", name: "" });
  const [examiners, setExaminers] = useState([]);

  const handleChange = (e) => setExaminer({ ...examiner, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registered = await registerExaminer(examiner);
    setExaminers((prev) => [...prev, registered]);
    setExaminer({ examinerId: "", name: "" });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Examiner Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Examiner ID" name="examinerId" value={examiner.examinerId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={examiner.name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Examiner</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {examiners.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.name} secondary={`ID: ${item.examinerId}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
