import React, { useState } from "react";
import {
  TextField, Button, List, ListItem, ListItemText,
  Typography, Box, Grid, Divider
} from "@mui/material";
import { useExaminerApi } from "../api/examinerApi"; // ✅ Correct import

export default function ExaminerPanel() {
  // ✅ Call the hook to get API functions
  const {
    registerExaminer,
    modifyTestPaper,
    declareResults,
    checkCopies,
    getTestsByExaminer,
    checkResults,
  } = useExaminerApi();

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
  const [checkResultParams, setCheckResultParams] = useState({ studentId: "", testId: "" });
  const [checkedResult, setCheckedResult] = useState(null);

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

  // Declare results
  const handleDeclareResults = async () => {
    const msg = await declareResults(testId);
    setResultsMessage(msg);
  };

  // Check copies
  const handleCheckCopies = async () => {
    const msg = await checkCopies(testId);
    setCopiesMessage(msg);
  };

  // Fetch tests by examiner
  const handleFetchExaminerTests = async () => {
    const tests = await getTestsByExaminer(searchExaminerId);
    setExaminerTests(Array.isArray(tests) ? tests : []);
  };

  // Check Results inputs change
  const handleCheckResultsChange = (e) => {
    setCheckResultParams({ ...checkResultParams, [e.target.name]: e.target.value });
  };

  // Fetch and set checked result
  const handleCheckResultsSubmit = async () => {
    if (!checkResultParams.studentId || !checkResultParams.testId) {
      alert("Please enter both Student ID and Test ID");
      return;
    }
    try {
      const result = await checkResults(checkResultParams.studentId, checkResultParams.testId);
      setCheckedResult(result);
    } catch (error) {
      alert("Result not found or error occurred");
      setCheckedResult(null);
    }
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
          <Button variant="contained" onClick={handleDeclareResults} fullWidth>Declare Results</Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" onClick={handleCheckCopies} fullWidth>Check Copies</Button>
        </Grid>
      </Grid>
      {resultsMessage && <Typography color="success.main">{resultsMessage}</Typography>}
      {copiesMessage && <Typography color="info.main">{copiesMessage}</Typography>}

      <Divider sx={{ my: 2 }} />

      {/* View Tests By Examiner */}
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
          <Button variant="outlined" onClick={handleFetchExaminerTests} fullWidth>
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
                      Test Code: {test.testId}<br />
                      Examiner: {test.examinerName || searchedExaminerName}<br />
                      Duration: {test.duration} min<br />
                      Start Time: {test.startTime}<br />
                      Number of Questions: {test.numberOfQuestions}
                    </Typography>
                  </>
                }
                secondary={
                  test.students?.length > 0 && (
                    <span>
                      <Typography variant="body2" component="span" sx={{ fontWeight: "bold", display: "block", mt: 1 }}>
                        Students:
                      </Typography>
                      {test.students.map(s => (
                        <span key={s.id} style={{ display: "block", marginLeft: 16, marginTop: 8 }}>
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
          <Typography color="text.primary">No tests found.</Typography>
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Check Student Result */}
      <Typography variant="h6">Check Student Result</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Student ID"
            name="studentId"
            value={checkResultParams.studentId}
            onChange={handleCheckResultsChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Test ID"
            name="testId"
            value={checkResultParams.testId}
            onChange={handleCheckResultsChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" fullWidth onClick={handleCheckResultsSubmit}>
            Check Result
          </Button>
        </Grid>
      </Grid>

      {checkedResult && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
            Student:&nbsp;
            <span style={{ color: "#1976d2", fontWeight: "bold" }}>
              {checkedResult.studentName && checkedResult.studentName.trim() !== ""
                ? checkedResult.studentName
                : <span style={{ color: "#d32f2f" }}>[Name not found]</span>}
            </span>
          </Typography>
          <Typography sx={{ color: "text.primary" }}>Grade: {checkedResult.grade ?? "—"}</Typography>
          <Typography sx={{ color: "text.primary" }}>Marks: {checkedResult.marks ?? "—"}</Typography>
          <Typography sx={{ color: "text.primary" }}>Test ID: {checkedResult.testId ?? "—"}</Typography>
        </Box>
      )}
    </Box>
  );
}
