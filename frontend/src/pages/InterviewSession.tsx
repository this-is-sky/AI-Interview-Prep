import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Question {
  id: string;
  text: string;
  difficulty?: string;
}

interface Session {
  _id: string;
  userId: string;
  role: string;
  questions: Question[];
  answers: Array<{
    questionId: string;
    answer: string;
    score: number;
    feedback: string;
  }>;
}

export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await apiClient.get(`/interview/${id}/result`);
        setSession(res.data);
      } catch (err) {
        setError("Failed to load interview session.");
        console.error(err);
      }
    }
    fetchSession();
  }, [id]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset hint when moving to new question
  useEffect(() => {
    setShowHint(false);
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHint = (question: Question) => {
    // Generate a simple hint based on the difficulty
    if (question.difficulty === 'easy') {
      return "💡 Tip: Focus on the fundamentals and explain your reasoning step by step.";
    } else if (question.difficulty === 'hard') {
      return "💡 Tip: Consider edge cases, scalability, and trade-offs in your solution.";
    }
    return "💡 Tip: Structure your answer with an introduction, main points, and conclusion.";
  };

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await apiClient.get(`/interview/${id}/result`);
        setSession(res.data);
      } catch (err) {
        setError("Failed to load interview session.");
        console.error(err);
      }
    }
    fetchSession();
  }, [id]);

  async function submit() {
    if (!session || !session.questions[currentQuestionIndex]) return;
    
    try {
      setLoading(true);
      setError("");
      
      const currentQuestion = session.questions[currentQuestionIndex];
      await apiClient.post(`/interview/${id}/answer`, {
        questionId: currentQuestion.id,
        answer
      });
      
      // Move to next question or finish
      if (currentQuestionIndex < session.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer("");
      } else {
        // All questions answered, go to results
        navigate(`/interview/${id}/result`);
      }
    } catch (err) {
      setError("Failed to submit answer. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <Layout>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Loading interview...</p>
        </div>
      </Layout>
    );
  }

  const currentQuestion = session.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / session.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Interview Session</h2>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                  <span className="text-indigo-600 font-mono font-bold">⏱ {formatTime(timeElapsed)}</span>
                </div>
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {session.questions.length}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex-1">
                {currentQuestion.text}
              </h3>
              <button
                onClick={() => setShowHint(!showHint)}
                className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                {showHint ? "Hide Hint" : "Show Hint 💡"}
              </button>
            </div>
            {currentQuestion.difficulty && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                {currentQuestion.difficulty}
              </span>
            )}
            {showHint && (
              <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                <p className="text-sm text-yellow-800">{getHint(currentQuestion)}</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Answer:</label>
            <textarea 
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={8}
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={loading}
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={submit}
              disabled={loading || !answer.trim()}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading 
                ? "Submitting..." 
                : currentQuestionIndex < session.questions.length - 1 
                  ? "Next Question" 
                  : "Finish Interview"
              }
            </button>
            
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setAnswer("");
                }}
                disabled={loading}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
