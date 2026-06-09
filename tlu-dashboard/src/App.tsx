import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import { SchedulePage } from "./features/schedule/pages/SchedulePage";
import { CommunicationPage } from "./features/communication/pages/CommunicationPage";
import AdminLogin from "./features/login/Login";
import { AuthProvider, useAuth } from "./components/context/AuthContext"; 
import { MessagingProvider } from "./components/context/MessagingContext";
import { SemesterProvider } from "./components/context/SemesterContext";
import { SocketProvider } from "./components/context/SocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Component trung gian để bọc MessagingProvider và SocketProvider cho các route cần thiết
const AuthenticatedArea = () => {
  return (
    <SocketProvider>
      <MessagingProvider>
        <SemesterProvider>
          <DashboardLayout />
        </SemesterProvider>
      </MessagingProvider>
    </SocketProvider>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" replace />} 
      />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <AuthenticatedArea />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="attendance/:sessionId" element={<AttendancePage />} />
        <Route path="communication" element={<CommunicationPage />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;