import { Key, useEffect, useState } from "react";
import axios from "axios";
import { SkillAPI } from "../App";
import { WilderProps } from "./Wilder";

interface SelectWilders {
  wilders: WilderProps[];
}

export default function AddSkillWithGrade({ wilders }: SelectWilders) {
  const [wilder, setWilder] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<SkillAPI[]>([]);
  const [grade, setGrade] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const wildersSkill = await axios.get("http://localhost:8000/api/skill");
      setSkills(wildersSkill.data);
    };
    fetchData();
  }, []);

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
          {wilders.map((wilder, key: Key) => (
            <option key={key} value={wilder.id}>
              {wilder.name}, ({wilder.city})
            </option>
          ))}
        </select>
        <label>Select a Skill : </label>
        <select name="pets" onChange={(e) => setSkill(e.target.value)}>
          <option value="">--Select a skill--</option>
          {skills.map((skill, key) => (
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
