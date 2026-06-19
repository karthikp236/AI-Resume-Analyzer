const SKILLS = [
  "Java",
  "Python",
  "C",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "Spring",
  "Spring Boot",
  "Springboot",
  "Hibernate",
  "MongoDB",
  "MySQL",
  "SQLite",
  "Firebase",
  "AWS",
  "Docker",
  "Kubernetes",
  "Redis",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind CSS",
  "SQL",
  "Vite",
];

export const extractSkills = (text: string): string[] => {
  const lowerText = text.toLowerCase();

  const foundSkills = SKILLS.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  const uniqueSkills = [...new Set(foundSkills)];

  return uniqueSkills.filter((skill) => {
    if (
      skill === "Java" &&
      lowerText.includes("javascript") &&
      !lowerText.includes(" java ")
    ) {
      return false;
    }

    if (
      skill === "C" &&
      lowerText.includes("c++")
    ) {
      return false;
    }

    return true;
  });
};