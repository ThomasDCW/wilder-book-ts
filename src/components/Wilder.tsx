import blank_profile from "../assets/blank_profile.png";
import Skill, { SkillProps } from "./Skill";
import axios from "axios";

export interface WilderProps {
  name: string;
  id: number;
  skills: SkillProps[];
  city: string;
}

export default function Wilder({ name, id, skills, city }: WilderProps) {
  return (
    <article className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      {city ? <h4>{city}</h4> : null}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill, key) => {
          return <Skill key={key} title={skill.title} vote={skill.vote} />;
        })}
      </ul>
      <form
        onSubmit={(e) => {
          axios.delete(`http://localhost:8000/api/wilder/${id}`);
        }}
      >
        <button type="submit">Delete</button>
      </form>
    </article>
  );
}
