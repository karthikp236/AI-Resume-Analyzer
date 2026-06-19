import { useEffect, useState } from "react";
import API from "../services/api";
import ResumeUploader from "../components/ResumeUploader";
import History from "../components/History";

function Dashboard() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    API.get("/api/test")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Backend Connection Failed");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>

          <p className="text-slate-400 text-lg mt-4">
            ATS Optimization • Job Matching • AI Suggestions
          </p>

          <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
            <span className="text-green-400">
              {message}
            </span>
          </div>
        </div>

        <ResumeUploader />

        <div className="mt-12">
          <History />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;