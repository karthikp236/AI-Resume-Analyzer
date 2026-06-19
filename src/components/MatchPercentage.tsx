interface Props {
  percentage: number;
}

function MatchPercentage({
  percentage,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
      <h3 className="text-slate-400">
        Job Match
      </h3>

      <div className="mt-8 text-center">
        <h1 className="text-6xl font-bold text-cyan-400">
          {percentage}%
        </h1>
      </div>
    </div>
  );
}

export default MatchPercentage;