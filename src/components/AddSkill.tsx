import axios from "axios";
import { useState } from "react";

export default function AddSkill() {
  const [skill, setSkill] = useState("");

  return (
    <div>
      <form
        className="form"
        onSubmit={() => {
          axios.post("http://localhost:8000/api/skill", {
            name: skill,
          });
        }}
      >
        <label>Skill</label>
        <input
          type="text"
          placeholder="React, Node, JS ..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button type="submit">Add a Skill</button>
      </form>
    </div>
  );
}
