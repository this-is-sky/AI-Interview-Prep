import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has uploaded a resume from backend
    async function checkResume() {
      try {
        // Fetch user profile to check if resumeText exists
        const res = await apiClient.get("/auth/profile");
        setResumeUploaded(res.data.resumeText && res.data.resumeText.length > 0);
      } catch (err) {
        console.error("Failed to fetch resume status", err);
        setResumeUploaded(false);
      } finally {
        setLoading(false);
      }
    }
    checkResume();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl">
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-600 mb-8">Welcome! Follow these steps to start your AI interview preparation.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
              <h3 className="font-semibold text-lg">Upload Resume</h3>
              {resumeUploaded && (
                <span className="ml-auto text-green-600 text-sm font-medium">✓ Uploaded</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4">Upload your resume in PDF format to help AI tailor questions to your experience.</p>
            {loading ? (
              <div className="text-gray-500 text-sm">Checking status...</div>
            ) : resumeUploaded ? (
              <>
                <div className="bg-green-50 text-green-700 p-3 rounded mb-3 text-sm">
                  Resume uploaded successfully!
                </div>
                <button 
                  onClick={() => navigate("/resume-upload")}
                  className="bg-indigo-200 text-indigo-700 px-6 py-2 rounded hover:bg-indigo-300 transition"
                >
                  Re-upload Resume
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate("/resume-upload")}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              >
                Upload Resume
              </button>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
              <h3 className="font-semibold text-lg">Start Interview</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Begin your AI-powered mock interview session and practice your skills.</p>
            <button 
              onClick={() => navigate("/interview/start")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Start Interview
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'linear-gradient(to right, #6366f1, #9333ea)' }} className="rounded-lg shadow-lg p-8 mb-8">
          <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>🚀 Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/interview/history")}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              className="p-6 rounded-lg transition text-left"
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Interview History</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>View and analyze all your past interview sessions</div>
            </button>
            
            <button
              onClick={() => navigate("/statistics")}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              className="p-6 rounded-lg transition text-left"
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Progress & Stats</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>Track your improvement over time with detailed analytics</div>
            </button>
            
            <button
              onClick={() => navigate("/interview/start")}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              className="p-6 rounded-lg transition text-left"
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>Start New Interview</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>Begin a new practice interview session right away</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
