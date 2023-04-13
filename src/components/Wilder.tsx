import { gql, useMutation } from "@apollo/client";
import blank_profile from "../assets/blank_profile.png";
import Skill, { SkillProps } from "./Skill";
import { GET_WILDERS } from "../App";

export interface WilderProps {
  name: string;
  id: number;
  skills: SkillProps[];
  city: string;
}

const DELETE_WILDER = gql`
  mutation DeletedWilder($deletedWilderId: Float!) {
    deletedWilder(id: $deletedWilderId) {
      raw
      affected
    }
  }
`;

export default function Wilder({ name, id, skills, city }: WilderProps) {
  const [DeleteWilder, { loading, error }] = useMutation(DELETE_WILDER);
  if (loading) return <p>"Submitting..."</p>;
  if (error) return <p>Submission error!</p>;

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
      <input
        type="button"
        onClick={(e) => {
          e.preventDefault();
          DeleteWilder({
            variables: { deletedWilderId: id },
            refetchQueries: [GET_WILDERS],
          });
        }}
        value="Delete"
      />
    </article>
  );
}
