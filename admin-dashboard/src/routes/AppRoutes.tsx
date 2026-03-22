import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AttendanceConfigPage from "../pages/AttendanceConfigPage";
import NewsEditorPage from "../pages/NewsEditorPage";
import MasterDataPage from "../pages/MasterDataPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/attendance" element={<AttendanceConfigPage />} />
        <Route path="/news" element={<NewsEditorPage />} />
        <Route path="/master-data" element={<MasterDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}
