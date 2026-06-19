import { useEffect, useState } from "react";
import {
  FileText,
  Trash2,
  TrendingUp,
  Target,
} from "lucide-react";

import API from "../services/api";

interface HistoryItem {
  id: number;
  file_name: string;
  ats_score: number;
  match_percentage: number;
  created_at: string;
}

function History() {
  const [history, setHistory] = useState<
    HistoryItem[]
  >([]);

  const loadHistory = () => {
    API.get("/api/analysis/history")
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const deleteItem = async (
    id: number
  ) => {
    try {
      await API.delete(
        `/api/analysis/history/${id}`
      );

      setHistory((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Analysis History
        </h2>

        <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          {history.length} Records
        </span>
      </div>

      {history.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <FileText
            size={50}
            className="mx-auto text-slate-500 mb-4"
          />

          <h3 className="text-xl font-semibold">
            No Analysis History
          </h3>

          <p className="text-slate-400 mt-2">
            Upload a resume to start
            tracking analyses.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {history.map((item) => (
            <div
              key={item.id}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                shadow-lg
                hover:border-cyan-500/40
                hover:shadow-cyan-500/10
                transition-all
              "
            >
              <div className="flex justify-between items-start">

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <FileText
                      size={22}
                      className="text-cyan-400"
                    />

                    <h3 className="text-lg font-semibold">
                      {item.file_name}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteItem(item.id)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-red-500/10
                    border
                    border-red-500/30
                    text-red-400
                    hover:bg-red-500/20
                    transition
                  "
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div
                  className="
                    bg-slate-950
                    rounded-2xl
                    p-4
                    border
                    border-slate-800
                  "
                >
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <TrendingUp size={18} />
                    ATS Score
                  </div>

                  <h2 className="text-3xl font-bold">
                    {item.ats_score}
                    <span className="text-slate-400 text-lg">
                      /100
                    </span>
                  </h2>
                </div>

                <div
                  className="
                    bg-slate-950
                    rounded-2xl
                    p-4
                    border
                    border-slate-800
                  "
                >
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Target size={18} />
                    Job Match
                  </div>

                  <h2 className="text-3xl font-bold">
                    {item.match_percentage}
                    %
                  </h2>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;