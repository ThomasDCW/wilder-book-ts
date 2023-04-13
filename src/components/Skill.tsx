export interface SkillProps {
  name: string;
  vote: number;
}

export default function Skill({ name, vote }: SkillProps) {
  return (
    <li>
      {name}
      <span className="votes">{vote}</span>
    </li>
  );
}
