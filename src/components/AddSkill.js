import { useState, useEffect } from "react";
import axios from "axios";

export default function AddSkill({ names }) {
  const [wilder, setWilder] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSKills] = useState([]);
  console.log(wilder);
  console.log(skill);

  useEffect(() => {
    const fetchData = async () => {
      const wildersSkill = await axios.get("http://localhost:8000/api/skill");
      setSKills(wildersSkill.data);
    };
    fetchData();
  }, [skills.data]);
  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          axios.put("http://localhost:8000/api/wilder/addskill", {
            wilderName: wilder,
            skillName: skill,
          });
        }}
      >
        <label>Select a wilder:</label>
        <select name="pets" onChange={(e) => setWilder(e.target.value)}>
          <option value="">--Select a wilder--</option>
          {names.map((name, key) => (
            <option key={key}>{name.name}</option>
          ))}
        </select>
        <label>Select a Skill :</label>
        <select name="pets" onChange={(e) => setSkill(e.target.value)}>
          <option value="">--Select a Skill--</option>
          {skills.map((skill, key) => (
            <option key={key}>{skill.name}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
