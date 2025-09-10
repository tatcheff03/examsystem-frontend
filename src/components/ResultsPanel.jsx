import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { useResultsApi } from "../api/resultsApi";
import { useKeycloak } from "../components/useKeycloak.js";

export default function ResultsPanel() {
  const { keycloak } = useKeycloak();
  const { getResult, getMyResults } = useResultsApi();

  const [resultQuery, setResultQuery] = useState({ studentId: "", testId: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const isStudent = keycloak.hasRealmRole("STUDENT");

  const handleChange = (e) =>
    setResultQuery({ ...resultQuery, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { studentId, testId } = resultQuery;

    if (!studentId || !testId) {
      alert("Please enter the required fields.");
      return;
    }

    try {
      const fetched = await getResult(studentId, testId);
      setResults([fetched]); // Admin fetch one result
      setResultQuery({ studentId: "", testId: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch result. Check your permissions or input values.");
    }
  };

  // Fetch student results only once
  useEffect(() => {
    if (isStudent && keycloak?.authenticated) {
      const fetchMyResults = async () => {
        try {
          setLoading(true);
          const fetched = await getMyResults();
          setResults(fetched);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch your results.");
        } finally {
          setLoading(false);
        }
      };
      fetchMyResults();
    }
    // Only run once on mount for student
  }, []); // <-- empty dependency array ensures it runs only once

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#0d47a1" }}>
        Results List
      </Typography>

      {/* Admin/Examiner Form */}
      {!isStudent && (
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
              <Button type="submit" variant="contained" fullWidth>
                Get Result
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Results List */}
      {loading && isStudent && <Typography sx={{ mt: 2 }}>Loading your results...</Typography>}

      {!loading && results.length > 0 && (
        <List sx={{ mt: 3 }}>
          {results.map((result) => (
            <ListItem key={result.testId} divider>
              <ListItemText
                primary={
                  <Typography sx={{ color: '#1565c0', fontWeight: 600 }}>
                    {`Student: ${result.studentName} - Grade: ${result.grade}`}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: 'text.secondary' }}>
                    {`Marks: ${result.marks} | Test ID: ${result.testId}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {!loading && isStudent && results.length === 0 && (
        <Typography sx={{ mt: 2 }}>No results found.</Typography>
      )}
    </Box>
  );
}
