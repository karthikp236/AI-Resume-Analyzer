export const getMissingKeywords = (
  resumeSkills: string[],
  jobSkills: string[]
): string[] => {
  return jobSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );
};