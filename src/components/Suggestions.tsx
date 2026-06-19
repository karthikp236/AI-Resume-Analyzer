interface SuggestionsProps {
  missingKeywords: string[];
  suggestions: string[];
}

function Suggestions({
  missingKeywords,
  suggestions,
}: SuggestionsProps) {
  return (
    <div>
      <h3>Missing Keywords</h3>

      <ul>
        {missingKeywords.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>AI Suggestions</h3>

      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;