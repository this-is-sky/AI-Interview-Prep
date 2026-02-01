import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface InterviewData {
  _id: string;
  userId: string;
  role: string;
  questions: Array<{ id: string; text: string; difficulty: string }>;
  answers: Array<{ questionId: string; answer: string; score: number; feedback: string }>;
  createdAt: string;
  updatedAt: string;
}

export default function InterviewResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<InterviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiClient.get(`/interview/${id}/result`)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading results...</p>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load interview results.</p>
        </div>
      </Layout>
    );
  }

  const totalScore = data.answers.reduce((sum, ans) => sum + (ans.score || 0), 0);
  const averageScore = data.answers.length > 0 ? (totalScore / data.answers.length).toFixed(1) : 0;
  const maxScore = data.answers.length * 10;
  const percentage = ((totalScore / maxScore) * 100).toFixed(0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-4">Interview Results</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <p className="text-xl font-bold text-indigo-600">{data.role}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average Score</p>
              <p className="text-xl font-bold text-green-600">{averageScore} / 10</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Overall Performance</p>
              <p className="text-xl font-bold text-blue-600">{percentage}%</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Performance</span>
              <span>{totalScore} / {maxScore} points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all ${
                  Number(percentage) >= 80 ? 'bg-green-500' : 
                  Number(percentage) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {data.questions.map((question, index) => {
            const answer = data.answers.find(a => a.questionId === question.id);
            
            return (
              <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        Question {index + 1}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                        {question.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{question.text}</h3>
                  </div>
                  {answer && (
                    <div className="ml-4 text-right">
                      <div className={`text-2xl font-bold ${
                        answer.score >= 8 ? 'text-green-600' :
                        answer.score >= 6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {answer.score}/10
                      </div>
                    </div>
                  )}
                </div>

                {answer ? (
                  <>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Your Answer:</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded">{answer.answer}</p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">AI Feedback:</p>
                      <p className="text-gray-700">{answer.feedback}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">No answer submitted</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/interview/start")}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
          >
            Start New Interview
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
