import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Box, Grid } from "@mui/material";
import { addTestPaper } from "../api/testPaperApi";

export function TestPaperPanel() {
  const [question, setQuestion] = useState({
    testId: "",
    question: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    correctChoice: ""
  });
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => setQuestion({ ...question, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await addTestPaper(question);
    setQuestions((prev) => [...prev, saved]);
    setQuestion({ testId: "", question: "", choiceA: "", choiceB: "", choiceC: "", choiceD: "", correctChoice: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Test Paper Panel</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Test ID" name="testId" value={question.testId} onChange={handleChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Question" name="question" value={question.question} onChange={handleChange} fullWidth multiline rows={2} />
          </Grid>
          <Grid item xs={12} sm={6}><TextField label="Choice A" name="choiceA" value={question.choiceA} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Choice B" name="choiceB" value={question.choiceB} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Choice C" name="choiceC" value={question.choiceC} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Choice D" name="choiceD" value={question.choiceD} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Correct Choice" name="correctChoice" value={question.correctChoice} onChange={handleChange} fullWidth inputProps={{ maxLength: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Add Question</Button>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ mt: 3 }}>
        {questions.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.question} secondary={`Correct: ${item.correctChoice} | Test ID: ${item.testId}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
