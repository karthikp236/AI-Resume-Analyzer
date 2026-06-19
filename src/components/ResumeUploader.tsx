import { useState } from "react";
import { Upload, FileText, Brain } from "lucide-react";

import API from "../services/api";

import ATSScore from "./ATSScore";
import MatchPercentage from "./MatchPercentage";
import Skills from "./Skills";

function ResumeUploader() {
  const [file, setFile] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  const [resumeText, setResumeText] =
    useState("");

  const [skills, setSkills] =
    useState<string[]>([]);

  const [atsScore, setAtsScore] =
    useState(0);

  const [jobDescription, setJobDescription] =
    useState("");

  const [matchPercentage, setMatchPercentage] =
    useState(0);

  const [missingKeywords, setMissingKeywords] =
    useState<string[]>([]);

  const [suggestions, setSuggestions] =
    useState<string[]>([]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);
    formData.append(
      "jobDescription",
      jobDescription
    );

    try {
      const response = await API.post(
        "/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      setResumeText(
        response.data.extractedText || ""
      );

      setSkills(
        response.data.skills || []
      );

      setAtsScore(
        response.data.atsScore || 0
      );

      setMatchPercentage(
        response.data.matchPercentage || 0
      );

      setMissingKeywords(
        response.data.missingKeywords || []
      );

      setSuggestions(
        response.data.suggestions || []
      );
    } catch (error) {
      console.error(error);
      setMessage("Upload Failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Upload Section */}

      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">

        <h2 className="text-3xl font-bold mb-6">
          Resume Analysis
        </h2>

        <div className="space-y-6">

          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            placeholder="Paste Job Description Here..."
            className="
              w-full
              bg-slate-950
              border
              border-slate-700
              rounded-2xl
              p-4
              text-white
              focus:outline-none
              focus:border-cyan-500
            "
          />

          <div
  className="
    border-2
    border-dashed
    border-cyan-500/40
    rounded-3xl
    p-10
    text-center
    bg-slate-950
    hover:border-cyan-400
    transition
  "
>
  <Upload
    size={50}
    className="mx-auto text-cyan-400 mb-5"
  />

  <h3 className="text-xl font-semibold mb-2">
    Upload Your Resume
  </h3>

  <p className="text-slate-400 mb-6">
    PDF format only
  </p>

  <label
    htmlFor="resume-upload"
    className="
      inline-block
      cursor-pointer
      px-6
      py-3
      rounded-xl
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      text-white
      font-semibold
      hover:opacity-90
      transition
    "
  >
    Choose Resume
  </label>

  <input
    id="resume-upload"
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={(e) =>
      setFile(
        e.target.files?.[0] || null
      )
    }
  />

  <div className="mt-5">
    {file ? (
      <div
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          bg-cyan-500/10
          border
          border-cyan-500/30
          text-cyan-300
        "
      >
        📄 {file.name}
      </div>
    ) : (
      <p className="text-slate-500">
        No file selected
      </p>
    )}
  </div>
</div>
          <button
            onClick={handleUpload}
            className="
              w-full
              py-4
              rounded-2xl
              font-semibold
              text-lg
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:opacity-90
              transition
            "
          >
            Analyze Resume
          </button>

          {message && (
            <div
              className="
                bg-green-500/10
                border
                border-green-500/30
                rounded-xl
                p-3
                text-green-400
              "
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Score Cards */}

      {(atsScore > 0 ||
        matchPercentage > 0) && (
        <div className="grid md:grid-cols-2 gap-6">
          <ATSScore score={atsScore} />

          <MatchPercentage
            percentage={matchPercentage}
          />
        </div>
      )}

      {/* Skills */}

      {skills.length > 0 && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <Skills skills={skills} />
        </div>
      )}

      {/* Missing Keywords */}

      {missingKeywords.length > 0 && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <h3 className="text-xl font-semibold mb-4">
            Missing Keywords
          </h3>

          <div className="flex flex-wrap gap-3">
            {missingKeywords.map(
              (keyword) => (
                <span
                  key={keyword}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-500/20
                    border
                    border-red-500/40
                    text-red-300
                  "
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* AI Suggestions */}

      {suggestions.length > 0 && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-cyan-400" />
            <h3 className="text-xl font-semibold">
              AI Suggestions
            </h3>
          </div>

          <ul className="space-y-3">
            {suggestions.map(
              (suggestion, index) => (
                <li
                  key={index}
                  className="text-slate-300"
                >
                  ✓ {suggestion}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Resume Text */}

      {resumeText && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-cyan-400" />
            <h3 className="text-xl font-semibold">
              Extracted Resume Text
            </h3>
          </div>

          <pre
            className="
              max-h-[400px]
              overflow-y-auto
              whitespace-pre-wrap
              text-slate-300
              bg-slate-950
              rounded-xl
              p-4
            "
          >
            {resumeText}
          </pre>
        </div>
      )}

    </div>
  );
}

export default ResumeUploader;