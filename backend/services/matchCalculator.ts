export const calculateMatchPercentage = (
  resumeSkills: string[],
  jobSkills: string[]
): number => {
  if (jobSkills.length === 0) return 0;

  const matchedSkills = resumeSkills.filter((skill) =>
    jobSkills.includes(skill)
  );

  return Math.round(
    (matchedSkills.length / jobSkills.length) * 100
  );
};