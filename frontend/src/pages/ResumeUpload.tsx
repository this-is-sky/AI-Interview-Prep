import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { apiClient } from "../api/client";

export default function ResumeUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function upload() {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      
      const form = new FormData();
      form.append("resume", file);
      
      await apiClient.post("/resume/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setSuccess("Resume uploaded successfully! Redirecting to dashboard...");
      setFile(null);
      
      // Navigate back to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Failed to upload resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded shadow max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>
        
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select PDF File:</label>
          <input
            type="file"
            accept=".pdf"
            onChange={e => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
                setError("");
              }
            }}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {file && <p className="text-sm text-gray-600 mt-2">Selected: {file.name}</p>}
        </div>
        
        <button
          onClick={upload}
          disabled={loading || !file}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </Layout>
  );
}
