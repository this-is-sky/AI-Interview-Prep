import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Interview {
  _id: string;
  role: string;
  questions: Array<{ id: string; text: string; difficulty: string }>;
  answers: Array<{ questionId: string; answer: string; score: number; feedback: string }>;
  createdAt: string;
}

export default function InterviewHistory() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    apiClient.get("/interview/history")
      .then(res => {
        setInterviews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getAverageScore = (interview: Interview) => {
    if (interview.answers.length === 0) return 0;
    const total = interview.answers.reduce((sum, ans) => sum + (ans.score || 0), 0);
    return (total / interview.answers.length).toFixed(1);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50";
    if (score >= 6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const filteredInterviews = filter === "all" 
    ? interviews 
    : interviews.filter(i => i.role.toLowerCase().includes(filter.toLowerCase()));

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading interview history...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Interview History</h2>
          <button
            onClick={() => navigate("/interview/start")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            New Interview
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="block text-sm font-medium mb-2">Filter by Role:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-64 p-2 border rounded"
          >
            <option value="all">All Roles</option>
            <option value="backend">Backend Engineer</option>
            <option value="frontend">Frontend Engineer</option>
            <option value="full stack">Full Stack Engineer</option>
            <option value="devops">DevOps Engineer</option>
            <option value="data">Data Engineer</option>
          </select>
        </div>

        {filteredInterviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No interviews found. Start your first interview!</p>
            <button
              onClick={() => navigate("/interview/start")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInterviews.map((interview) => {
              const avgScoreStr = getAverageScore(interview);
              const avgScore = typeof avgScoreStr === 'number' ? avgScoreStr : parseFloat(avgScoreStr as string);
              const date = new Date(interview.createdAt).toLocaleDateString();
              const time = new Date(interview.createdAt).toLocaleTimeString();

              return (
                <div
                  key={interview._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
                  onClick={() => navigate(`/interview/${interview._id}/result`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {interview.role}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          📅 {date}
                        </span>
                        <span className="flex items-center">
                          🕐 {time}
                        </span>
                        <span className="flex items-center">
                          📝 {interview.questions.length} questions
                        </span>
                        <span className="flex items-center">
                          ✅ {interview.answers.length} answered
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Average Score</p>
                        <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getPerformanceColor(avgScore)}`}>
                          {avgScore} / 10
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
