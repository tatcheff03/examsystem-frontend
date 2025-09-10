import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Container, Button } from "@mui/material";
import AdminPanel from "../components/AdminPanel";
import ExaminerPanel from "../components/ExaminerPanel";
import StudentPanel from "../components/StudentPanel";
import TestPanel from "../components/TestPanel";
import TestPaperPanel from "../components/TestPaperPanel";
import ResponsePanel from "../components/ResponsePanel";
import ResultsPanel from "../components/ResultsPanel";
import { useKeycloak } from "../components/useKeycloak.js";

function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return <div role="tabpanel">{children}</div>;
}

export default function MenuTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { keycloak, authenticated, initialized } = useKeycloak();

  const handleChange = (e, newValue) => setSelectedTab(newValue);

  if (!initialized) return <div>Loading Keycloak...</div>;
  if (!authenticated) return <div>Redirecting to login...</div>;

  // Tab definitions with roles
  const tabData = [
    { label: "Admin", panel: <AdminPanel />, role: "ADMIN" },
    { label: "Examiner", panel: <ExaminerPanel />, role: ["EXAMINER", "ADMIN"] },
    { label: "Student", panel: <StudentPanel />, role: ["ADMIN", "EXAMINER"] }, // Only admins/examiners can manage students
    { label: "Test", panel: <TestPanel />, role: ["EXAMINER", "ADMIN"] },
    { label: "Test Paper", panel: <TestPaperPanel />, role: ["EXAMINER", "ADMIN"] },
    { label: "Response", panel: <ResponsePanel />, role: ["STUDENT", "EXAMINER", "ADMIN"] },
    { label: "Results", panel: <ResultsPanel />, role: ["STUDENT", "EXAMINER", "ADMIN"] },
  ];

  // Filter tabs based on roles
  const visibleTabs = tabData.filter((tab) => {
    if (Array.isArray(tab.role)) {
      return tab.role.some((r) => keycloak.hasRealmRole(r));
    }
    return keycloak.hasRealmRole(tab.role);
  });

  // Logout handler
  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: 0, width: "100vw" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            height: "64px",
          }}
        >
          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ flexGrow: 1 }}
          >
            {visibleTabs.map((tab, idx) => (
              <Tab key={idx} label={tab.label} />
            ))}
          </Tabs>

          {/* Logout */}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 10 }}>
        {visibleTabs.map((tab, idx) => (
          <TabPanel key={idx} value={selectedTab} index={idx}>
            {tab.panel}
          </TabPanel>
        ))}
      </Container>
    </Box>
  );
}
