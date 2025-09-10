import React, { useState } from "react";
import {
  TextField, Button, List, ListItem, ListItemText, Typography,
  Box, Grid, Divider
} from "@mui/material";
import { useResponsesApi } from "../api/responseApi"; 

export default function ResponsePanel() {
  const { addResponse, getDetailedResponses } = useResponsesApi(); 

  const [response, setResponse] = useState({
    studentId: "",
    questionId: "",
    testId: "",
    selectedChoice: ""
  });
  const [responses, setResponses] = useState([]);
  const [detailQuery, setDetailQuery] = useState({ studentId: "", testId: "" });
  const [detailedResponses, setDetailedResponses] = useState([]);
  const [detailError, setDetailError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const handleChange = (e) =>
    setResponse({ ...response, [e.target.name]: e.target.value });

  const handleDetailQueryChange = (e) =>
    setDetailQuery({ ...detailQuery, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saved = await addResponse(response); // ✅ call via hook
      setResponses((prev) => [...prev, saved]);
      setResponse({ studentId: "", questionId: "", testId: "", selectedChoice: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add response.");
    }
  };

  const handleFetchDetailedResponses = async () => {
    setHasFetched(true);
    if (!detailQuery.studentId || !detailQuery.testId) {
      setDetailError("Please enter Student ID and Test ID");
      setDetailedResponses([]);
      return;
    }
    try {
      const data = await getDetailedResponses(detailQuery.studentId, detailQuery.testId); 
      setDetailedResponses(data);
      setDetailError(null);
    } catch (err) {
      console.error(err);
      setDetailError("Failed to fetch detailed responses");
      setDetailedResponses([]);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Response Panel</Typography>

      {/* Add Response Form */}
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

      <Divider sx={{ my: 4 }} />

      {/* Detailed Responses Query Section */}
      <Typography variant="h6" gutterBottom>View Detailed Responses</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Student ID" name="studentId" value={detailQuery.studentId} onChange={handleDetailQueryChange} fullWidth type="number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Test ID" name="testId" value={detailQuery.testId} onChange={handleDetailQueryChange} fullWidth type="number" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleFetchDetailedResponses} fullWidth>Load Detailed Responses</Button>
        </Grid>
      </Grid>

      {detailError && (
        <Typography color="error" sx={{ mb: 2 }}>{detailError}</Typography>
      )}

      {detailedResponses.length > 0 ? (
        <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: 1, p: 2 }}>
          <List>
            {detailedResponses.map((item, idx) => (
              <ListItem key={idx} divider sx={{ backgroundColor: "#f5f5f5" }}>
                <ListItemText
                  primary={
                    <Typography sx={{ color: "text.primary", fontWeight: "bold" }}>
                      {item.questionText}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: "text.secondary" }}>
                      Student: <span style={{ color: "#1976d2", fontWeight: 500 }}>{item.studentName}</span>
                      {" | "}Selected Answer: <span style={{ color: "#388e3c", fontWeight: 500 }}>{item.selectedChoice}</span>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        hasFetched && !detailError && (
          <Typography sx={{ fontStyle: "italic", color: "red" }}>No detailed responses loaded.</Typography>
        )
      )}
    </Box>
  );
}
