import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Stats {
  totalInterviews: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  totalQuestionsAnswered: number;
  roleBreakdown: Record<string, number>;
  difficultyBreakdown: Record<string, number>;
  recentProgress: Array<{ date: string; score: number }>;
}

export default function Statistics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/interview/statistics")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </Layout>
    );
  }

  if (!stats || stats.totalInterviews === 0) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Statistics Yet</h2>
          <p className="text-gray-600 mb-6">Complete some interviews to see your progress!</p>
          <button
            onClick={() => navigate("/interview/start")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Start Your First Interview
          </button>
        </div>
      </Layout>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Your Progress & Statistics</h2>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-linear-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
            <p className="text-indigo-100 mb-2">Total Interviews</p>
            <p className="text-4xl font-bold">{stats.totalInterviews}</p>
          </div>

          <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
            <p className="text-green-100 mb-2">Average Score</p>
            <p className="text-4xl font-bold">{stats.averageScore.toFixed(1)}</p>
          </div>

          <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
            <p className="text-blue-100 mb-2">Best Performance</p>
            <p className="text-4xl font-bold">{stats.bestScore.toFixed(1)}</p>
          </div>

          <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
            <p className="text-purple-100 mb-2">Questions Answered</p>
            <p className="text-4xl font-bold">{stats.totalQuestionsAnswered}</p>
          </div>
        </div>

        {/* Recent Progress Chart */}
        {stats.recentProgress && stats.recentProgress.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Recent Progress</h3>
            <div className="flex items-end justify-around h-64">
              {stats.recentProgress.slice(-10).map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative h-48 w-12 bg-gray-100 rounded-t">
                    <div
                      className={`absolute bottom-0 w-full rounded-t transition-all ${getScoreColor(item.score)}`}
                      style={{ height: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs mt-2 text-gray-600">{new Date(item.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xs font-bold">{item.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Role Breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Interviews by Role</h3>
            <div className="space-y-3">
              {Object.entries(stats.roleBreakdown).map(([role, count]) => (
                <div key={role}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{role}</span>
                    <span className="text-gray-600">{count} interviews</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(count / stats.totalInterviews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Difficulty Distribution</h3>
            <div className="space-y-4">
              {Object.entries(stats.difficultyBreakdown).map(([difficulty, count]) => {
                const percentage = ((count / stats.totalInterviews) * 100).toFixed(0);
                const color = difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'yellow' : 'red';
                
                return (
                  <div key={difficulty} className="flex items-center">
                    <div className={`w-20 h-20 rounded-full bg-${color}-100 flex items-center justify-center mr-4`}>
                      <div className="text-center">
                        <p className={`text-2xl font-bold text-${color}-600`}>{count}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium capitalize">{difficulty}</p>
                      <p className="text-sm text-gray-600">{percentage}% of total</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/interview/history")}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
          >
            View Interview History
          </button>
          <button
            onClick={() => navigate("/interview/start")}
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            Start New Interview
          </button>
        </div>
      </div>
    </Layout>
  );
}
