import { useState } from "react";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function InterviewStart() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Backend Engineer");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    try {
      setLoading(true);
      setError("");
      const res = await apiClient.post("/interview", { role, difficulty, questionCount });
      navigate(`/interview/${res.data.sessionId}`);
    } catch (err) {
      setError("Failed to start interview. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Start Interview</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Role:</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          >
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Data Engineer">Data Engineer</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Difficulty:</label>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          >
            <option value="easy">Easy - Junior Level</option>
            <option value="medium">Medium - Mid Level</option>
            <option value="hard">Hard - Senior Level</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {difficulty === "easy" && "Basic concepts and fundamentals"}
            {difficulty === "medium" && "Intermediate knowledge and problem-solving"}
            {difficulty === "hard" && "Advanced topics and system design"}
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Number of Questions:</label>
          <div className="grid grid-cols-3 gap-3">
            {[5, 10, 15].map(count => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`p-3 border-2 rounded-lg font-medium transition ${
                  questionCount === count
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-300 hover:border-indigo-300"
                }`}
                disabled={loading}
              >
                {count} Questions
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Estimated time: {questionCount * 3}-{questionCount * 5} minutes
          </p>
        </div>
        
        <button
          onClick={start}
          disabled={loading}
          className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Starting Interview..." : "Start Interview"}
        </button>
        
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-3 bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
        >
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
}
