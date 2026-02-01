import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ResumeUpload from "./pages/ResumeUpload.tsx";
import InterviewStart from "./pages/InterviewStart.tsx";
import InterviewSession from "./pages/InterviewSession.tsx";
import InterviewResult from "./pages/InterviewResult.tsx";
import InterviewHistory from "./pages/InterviewHistory.tsx";
import Statistics from "./pages/Statistics.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/resume-upload" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
          <Route path="/interview/start" element={<ProtectedRoute><InterviewStart /></ProtectedRoute>} />
          <Route path="/interview/:id" element={<ProtectedRoute><InterviewSession /></ProtectedRoute>} />
          <Route path="/interview/:id/result" element={<ProtectedRoute><InterviewResult /></ProtectedRoute>} />
          <Route path="/interview/history" element={<ProtectedRoute><InterviewHistory /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
