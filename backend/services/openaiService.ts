export const generateSuggestions = (
  missingKeywords: string[],
  atsScore: number
): string[] => {
  const suggestions: string[] = [];

  if (atsScore < 70) {
    suggestions.push(
      "Add more technical skills and projects."
    );
  }

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Consider learning: ${missingKeywords.join(", ")}`
    );
  }

  suggestions.push(
    "Add measurable achievements in projects."
  );

  suggestions.push(
    "Include deployment or cloud experience."
  );

  suggestions.push(
    "Mention internships or practical experience."
  );

  return suggestions;
};