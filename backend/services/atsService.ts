export const calculateATSScore = (
  skills: string[],
  text: string
): number => {
  let score = 0;

  // Skills (max 30)
  score += Math.min(skills.length * 1.5, 30);

  // Projects (20)
  const projectCount =
    (text.match(/project/gi) || []).length;
  score += Math.min(projectCount * 10, 20);

  // Experience (20)
  if (
    text.toLowerCase().includes("experience") ||
    text.toLowerCase().includes("internship")
  ) {
    score += 20;
  }

  // Education (10)
  if (
    text.toLowerCase().includes("bachelor") ||
    text.toLowerCase().includes("master")
  ) {
    score += 10;
  }

  // Contact (10)
  if (text.includes("@")) {
    score += 10;
  }

  // LinkedIn/GitHub (10)
  if (
    text.toLowerCase().includes("linkedin") &&
    text.toLowerCase().includes("github")
  ) {
    score += 10;
  }

  return Math.round(score);
};