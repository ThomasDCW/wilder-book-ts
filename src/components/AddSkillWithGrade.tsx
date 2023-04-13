import { Key, useEffect, useState } from "react";
import axios from "axios";
import { SkillAPI } from "../App";
import { WilderProps } from "./Wilder";
import { gql, useQuery } from "@apollo/client";

interface SelectWilders {
  wilders: WilderProps[];
}

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      name
      id
    }
  }
`;

export default function AddSkillWithGrade({ wilders }: SelectWilders) {
  const [wilder, setWilder] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_SKILLS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const skills: SkillAPI[] = data.skills;

  return (
    <div>
      <form
        className="form"
        onSubmit={() => {
          axios.post("http://localhost:8000/api/grade", {
            wilderId: wilder,
            skillId: skill,
            grade: grade,
          });
        }}
      >
        <label>Select a Wilder : </label>
        <select name="pets" onChange={(e) => setWilder(e.target.value)}>
          <option value="">--Select a wilder--</option>
          {wilders?.map((wilder, key: Key) => (
            <option key={key} value={wilder.id}>
              {wilder.name}, ({wilder.city})
            </option>
          ))}
        </select>
        <label>Select a Skill : </label>
        <select name="pets" onChange={(e) => setSkill(e.target.value)}>
          <option value="">--Select a skill--</option>
          {skills?.map((skill, key: Key) => (
            <option key={key} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
        <label>Add a grade : </label>
        <input
          type="number"
          min="0"
          max="10"
          value={grade}
          onChange={(e) => setGrade(parseInt(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
