import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">AI Interview Prep</h1>
        <div>
          {token ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Go to Dashboard
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Master Your Interviews with AI
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Practice with AI-powered interview questions, upload your resume, and get detailed feedback.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div 
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => token ? navigate("/interview/start") : navigate("/register")}
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">📝</h3>
            <h4 className="font-bold text-lg mb-2">AI-Powered Questions</h4>
            <p className="text-gray-600">Get realistic interview questions tailored to your role</p>
            <button className="mt-4 text-indigo-600 font-medium hover:underline">
              {token ? "Start Interview →" : "Get Started →"}
            </button>
          </div>

          <div 
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => token ? navigate("/resume-upload") : navigate("/register")}
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">📄</h3>
            <h4 className="font-bold text-lg mb-2">Resume Analysis</h4>
            <p className="text-gray-600">Upload your resume for personalized interview questions</p>
            <button className="mt-4 text-indigo-600 font-medium hover:underline">
              {token ? "Upload Resume →" : "Get Started →"}
            </button>
          </div>

          <div 
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => token ? navigate("/dashboard") : navigate("/register")}
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">⭐</h3>
            <h4 className="font-bold text-lg mb-2">Instant Feedback</h4>
            <p className="text-gray-600">Get detailed scoring and feedback on your answers</p>
            <button className="mt-4 text-indigo-600 font-medium hover:underline">
              {token ? "View Dashboard →" : "Get Started →"}
            </button>
          </div>
        </div>

        {!token && (
          <div className="mt-12">
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
