export interface SkillProps {
  title: string;
  vote: number;
}

export default function Skill({ title, vote }: SkillProps) {
  return (
    <li>
      {title}
      <span className="votes">{vote}</span>
    </li>
  );
}
