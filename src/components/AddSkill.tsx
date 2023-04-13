import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { GET_SKILLS } from "./AddSkillWithGrade";

const CREATE_SKILL = gql`
  mutation CreateSkill($name: String!) {
    createSkill(name: $name) {
      name
    }
  }
`;

export default function AddSkill() {
  const [CreateSkill, { error }] = useMutation(CREATE_SKILL);
  const [skill, setSkill] = useState("");

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <form
        className="form"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            if (!skill) {
              throw new Error("Les champs ne peuvent pas être vides.");
            }
            CreateSkill({
              variables: { name: skill },
              refetchQueries: [GET_SKILLS],
            });
            toast.success(`Le skill ${skill} a été ajouté`);
            setSkill("");
          } catch (error: any) {
            toast.error(error.message);
          }
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
