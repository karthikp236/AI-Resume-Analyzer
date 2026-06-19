import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
}

function ATSScore({ score }: Props) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
      <h3 className="text-slate-400 mb-6">
        ATS Score
      </h3>

      <div className="w-40 h-40 mx-auto">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: "#06b6d4",
            textColor: "#ffffff",
            trailColor: "#1e293b",
          })}
        />
      </div>
    </div>
  );
}

export default ATSScore;