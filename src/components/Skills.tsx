interface Props {
  skills: string[];
}

function Skills({ skills }: Props) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Detected Skills
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              px-4
              py-2
              rounded-full
              bg-cyan-500/20
              border
              border-cyan-500/40
              text-cyan-300
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Skills;