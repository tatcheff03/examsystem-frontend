import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Container } from "@mui/material";
import { AdminPanel } from "../components/AdminPanel";
import { ExaminerPanel } from "../components/ExaminerPanel";
import { StudentPanel } from "../components/StudentPanel";
import { TestPanel } from "../components/TestPanel";
import { TestPaperPanel } from "../components/TestPaperPanel";
import { ResponsePanel } from "../components/ResponsePanel";
import { ResultsPanel } from "../components/ResultsPanel";

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ display: value === index ? "block" : "none", padding: 0 }}
    >
      {children}
    </div>
  );
}

export function MenuTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
   <Box sx={{ width: "100%" }}>
  <AppBar
    position="fixed"
    color="primary"
    sx={{
      top: 0,
      left: 0,
      width: "100vw",
      margin: 0,
      boxShadow: 1,
    }}
  >
    <Tabs

      value={selectedTab}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      textColor="inherit"
      indicatorColor="secondary"
      sx={{
        width: "100vw",
        "& .MuiTabs-flexContainer": { justifyContent: "flex-start" },
        "& .MuiTab-root": { color: "#ddd" },
        "& .Mui-selected": { color: "#fff" },
        "& .MuiTabs-indicator": { backgroundColor: "red" },
      }}
    >
      <Tab label="Admin" />
      <Tab label="Examiner" />
      <Tab label="Student" />
      <Tab label="Test" />
      <Tab label="Test Paper" />
      <Tab label="Response" />
      <Tab label="Results" />
    </Tabs>
  </AppBar>

  {/* Keep Container if you want form content centered & with max width */}
   <Container maxWidth="md" sx={{ mt: 6 }}>
        <TabPanel value={selectedTab} index={0}><AdminPanel /></TabPanel>
        <TabPanel value={selectedTab} index={1}><ExaminerPanel /></TabPanel>
        <TabPanel value={selectedTab} index={2}><StudentPanel /></TabPanel>
        <TabPanel value={selectedTab} index={3}><TestPanel /></TabPanel>
        <TabPanel value={selectedTab} index={4}><TestPaperPanel /></TabPanel>
        <TabPanel value={selectedTab} index={5}><ResponsePanel /></TabPanel>
        <TabPanel value={selectedTab} index={6}><ResultsPanel /></TabPanel>
      </Container>
    </Box>

  );
}
