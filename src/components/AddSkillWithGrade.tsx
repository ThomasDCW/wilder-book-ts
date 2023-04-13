import { Key, useState } from "react";
import { GET_WILDERS, SkillAPI } from "../App";
import { WilderProps } from "./Wilder";
import { gql, useMutation, useQuery } from "@apollo/client";

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

const ADD_GRADE = gql`
  mutation AddGrade($grade: Float!, $skillId: Float!, $wilderId: Float!) {
    addGrade(grade: $grade, skillId: $skillId, wilderId: $wilderId) {
      grade
      skillId
      wilderId
    }
  }
`;

export default function AddSkillWithGrade({ wilders }: SelectWilders) {
  const [wilder, setWilder] = useState<number>(0);
  const [skill, setSkill] = useState<number>(0);
  const [grade, setGrade] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_SKILLS);
  const [AddGrade] = useMutation(ADD_GRADE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const skills: SkillAPI[] = data.skills;

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          AddGrade({
            variables: {
              grade,
              wilderId: wilder,
              skillId: skill,
            },
            refetchQueries: [GET_WILDERS],
          });
          setGrade(0);
        }}
      >
        <label>Select a Wilder : </label>
        <select
          name="pets"
          onChange={(e) => setWilder(parseInt(e.target.value))}
        >
          <option value="">--Select a wilder--</option>
          {wilders?.map((wilder, key: Key) => (
            <option key={key} value={wilder.id}>
              {wilder.name}, ({wilder.city})
            </option>
          ))}
        </select>
        <label>Select a Skill : </label>
        <select
          name="pets"
          onChange={(e) => setSkill(parseInt(e.target.value))}
        >
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
