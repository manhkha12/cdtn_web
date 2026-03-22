import { useState } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  return (
    <DashboardLayout onNavigate={setCurrentPage}>
      {currentPage === "dashboard" && <DashboardPage />}
      {currentPage === "attendance" && <AttendancePage />}
    </DashboardLayout>
  );
}

export default App;
