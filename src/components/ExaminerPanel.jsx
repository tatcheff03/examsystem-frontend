import React, { useState } from "react";
import {
  TextField, Button, List, ListItem, ListItemText,
  Typography, Box, Grid, Divider
} from "@mui/material";
import {
  registerExaminer, modifyTestPaper, declareResults, checkCopies,
  getTestsByExaminer
} from "../api/examinerApi";

export function ExaminerPanel() {
  const [examiner, setExaminer] = useState({ examinerId: "", name: "" });
  const [searchedExaminerName, setSearchedExaminerName] = useState("");
  const [examiners, setExaminers] = useState([]);
  const [testPaper, setTestPaper] = useState({
    id: "", testId: "", question: "", choiceA: "",
    choiceB: "", choiceC: "", choiceD: "", correctChoice: "",
  });
  const [testId, setTestId] = useState("");
  const [resultsMessage, setResultsMessage] = useState("");
  const [copiesMessage, setCopiesMessage] = useState("");
  const [searchExaminerId, setSearchExaminerId] = useState("");
  const [examinerTests, setExaminerTests] = useState([]);
 

  // Register examiner
  const handleExaminerChange = (e) =>
    setExaminer({ ...examiner, [e.target.name]: e.target.value });
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const registered = await registerExaminer(examiner);
    setExaminers((prev) => [...prev, registered]);
    setExaminer({ examinerId: "", name: "" });
  };

  // Modify test paper
  const handleTestPaperChange = (e) =>
    setTestPaper({ ...testPaper, [e.target.name]: e.target.value });
  const handleModifyTestPaper = async (e) => {
    e.preventDefault();
    const msg = await modifyTestPaper(testPaper);
    alert(msg);
    setTestPaper({
      id: "", testId: "", question: "", choiceA: "",
      choiceB: "", choiceC: "", choiceD: "", correctChoice: "",
    });
  };

  // Declare results for test
  const handleDeclareResults = async () => {
    const msg = await declareResults(testId);
    setResultsMessage(msg);
  };

  // Check copies for test
  const handleCheckCopies = async () => {
    const msg = await checkCopies(testId);
    setCopiesMessage(msg);
  };

const handleFetchExaminerTests = async () => {
  const tests = await getTestsByExaminer(searchExaminerId);
  setExaminerTests(Array.isArray(tests) ? tests : []);
};



  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <Typography variant="h5" gutterBottom>Examiner Panel</Typography>

      {/* Register Examiner */}
      <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Register Examiner</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Examiner ID" name="examinerId" value={examiner.examinerId}
              onChange={handleExaminerChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={examiner.name}
              onChange={handleExaminerChange} fullWidth />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Examiner</Button>
      </Box>
      <List>
        {examiners.map((item, i) => (
          <ListItem key={item.id || i} divider>
            <ListItemText primary={item.name} secondary={`ID: ${item.examinerId}`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Modify Test Paper */}
      <Box component="form" onSubmit={handleModifyTestPaper} noValidate sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Modify Test Paper</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="TestPaper ID" name="id" value={testPaper.id}
              onChange={handleTestPaperChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Test ID" name="testId" value={testPaper.testId}
              onChange={handleTestPaperChange} fullWidth type="number" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Question" name="question" value={testPaper.question}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Choice A" name="choiceA" value={testPaper.choiceA}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Choice B" name="choiceB" value={testPaper.choiceB}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Choice C" name="choiceC" value={testPaper.choiceC}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Choice D" name="choiceD" value={testPaper.choiceD}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Correct Choice" name="correctChoice" value={testPaper.correctChoice}
              onChange={handleTestPaperChange} fullWidth />
          </Grid>
        </Grid>
        <Button type="submit" variant="outlined" sx={{ mt: 2 }}>Modify Test Paper</Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Declare Results & Check Copies */}
      <Typography variant="subtitle1">Declare Results & Check Copies for Test</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Test ID" value={testId} onChange={e => setTestId(e.target.value)}
            fullWidth type="number" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" onClick={handleDeclareResults} fullWidth
            sx={{ mt: { xs: 1, sm: 0 } }}>Declare Results</Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" onClick={handleCheckCopies} fullWidth
            sx={{ mt: { xs: 1, sm: 0 } }}>Check Copies</Button>
        </Grid>
      </Grid>
      {resultsMessage && <Typography color="success.main" sx={{ mb: 1 }}>{resultsMessage}</Typography>}
      {copiesMessage && <Typography color="info.main" sx={{ mb: 1 }}>{copiesMessage}</Typography>}
      <Divider sx={{ my: 2 }} />

<Typography variant="subtitle1">View Tests By Examiner</Typography>
<Grid container spacing={2} sx={{ mb: 2 }}>
  <Grid item xs={12} sm={8}>
    <TextField
      label="Examiner ID"
      value={searchExaminerId}
      onChange={e => setSearchExaminerId(e.target.value)}
      fullWidth
      type="number"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <Button
      variant="outlined"
      onClick={handleFetchExaminerTests}
      fullWidth
    >
      Fetch Tests
    </Button>
  </Grid>
</Grid>
<List>
  {Array.isArray(examinerTests) && examinerTests.length > 0 ? (
    examinerTests.map((test) => (
      <ListItem key={test.id} alignItems="flex-start" divider>
        <ListItemText
          primary={
            <>
              <Typography variant="h6" color="primary">{test.name}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <span style={{ fontWeight: 500 }}>Test Code:</span> {test.testId}<br />
                <span style={{ fontWeight: 500 }}>Examiner:</span> {test.examinerName || searchedExaminerName}<br />
                <span style={{ fontWeight: 500 }}>Duration:</span> {test.duration} min<br />
                <span style={{ fontWeight: 500 }}>Start Time:</span> {test.startTime}<br />
                <span style={{ fontWeight: 500 }}>Number of Questions:</span> {test.numberOfQuestions}
              </Typography>
            </>
          }
          secondary={
            test.students?.length > 0 && (
              <span>
                <Typography
                  variant="body2"
                  component="span"
                  style={{ marginTop: 8 }}
                  sx={{ fontWeight: "bold", display: "block", mt: 1 }}
                >
                  Students:
                </Typography>
                {test.students.map(s => (
                  <span
                    key={s.id}
                    style={{
                      display: "block",
                      marginLeft: 16,
                      marginTop: 8
                    }}
                  >
                    <b>{s.name}</b> ({s.email})
                  </span>
                ))}
              </span>
            )
          }
        />
      </ListItem>
    ))
  ) : (
<Typography color="text.primary" align="left" sx={{ fontSize: '1.20rem' }}>
  No tests found.
</Typography>
  )}
</List>


<Divider sx={{ my: 2 }} />
    

      <List>
      </List>
    </Box>
  );
}
